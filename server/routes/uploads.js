import { Router } from 'express'
import multer from 'multer'
import { randomUUID } from 'crypto'
import path from 'path'
import { requireAuth } from '../middleware/authMiddleware.js'
import {
  getSupabaseAdmin,
  isStorageConfigured,
  STORAGE_BUCKET,
} from '../lib/supabase.js'

const router = Router()

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const MAX_SIZE = 5 * 1024 * 1024

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_TYPES.has(file.mimetype)) {
      cb(null, true)
      return
    }
    cb(new Error('Solo se permiten imágenes JPG, PNG o WebP'))
  },
})

function buildObjectPath(originalname) {
  const ext = path.extname(originalname).toLowerCase()
  const safeExt = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) ? ext : '.jpg'
  return `${Date.now()}-${randomUUID()}${safeExt}`
}

function handleMulterErrors(req, res, next) {
  upload.single('image')(req, res, (err) => {
    if (!err) {
      next()
      return
    }

    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({ error: 'La imagen no puede superar 5 MB' })
      return
    }

    res.status(400).json({ error: err.message })
  })
}

router.post('/image', requireAuth, handleMulterErrors, async (req, res) => {
  if (!isStorageConfigured()) {
    res.status(503).json({
      error: 'Supabase Storage no está configurado en el servidor.',
    })
    return
  }

  if (!req.file) {
    res.status(400).json({ error: 'No se recibió ninguna imagen' })
    return
  }

  try {
    const supabase = getSupabaseAdmin()
    const objectPath = buildObjectPath(req.file.originalname)

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(objectPath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      })

    if (error) {
      res.status(500).json({
        error: 'Error al subir la imagen',
        detalle: error.message,
      })
      return
    }

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(objectPath)

    res.json({ url: data.publicUrl, path: objectPath })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error al subir la imagen' })
  }
})

export default router
