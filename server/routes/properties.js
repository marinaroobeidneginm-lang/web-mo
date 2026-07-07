import { Router } from 'express'
import * as propertyRepo from '../repositories/propertyRepository.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import {
  normalizePropertyInput,
  validatePropertyInput,
} from '../utils/propertySchema.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const { tipo, operacion, page, limit } = req.query

    if (page || limit) {
      const result = await propertyRepo.findPaginated({
        tipo,
        operacion,
        page: Number(page) || 1,
        limit: Number(limit) || 9,
      })
      return res.json(result)
    }

    next()
  } catch {
    res.status(500).json({ error: 'Error al obtener propiedades' })
  }
}, requireAuth, async (req, res) => {
  try {
    const { tipo, operacion } = req.query
    const properties = await propertyRepo.findAll({ tipo, operacion })
    res.json(properties)
  } catch {
    res.status(500).json({ error: 'Error al obtener propiedades' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const property = await propertyRepo.findById(req.params.id)

    if (!property) {
      return res.status(404).json({ error: 'Propiedad no encontrada' })
    }

    res.json(property)
  } catch {
    res.status(500).json({ error: 'Error al obtener la propiedad' })
  }
})

router.post('/', requireAuth, async (req, res) => {
  try {
    const errors = validatePropertyInput(req.body)

    if (errors.length > 0) {
      return res.status(400).json({ error: 'Datos inválidos', detalles: errors })
    }

    const property = await propertyRepo.create(normalizePropertyInput(req.body))
    res.status(201).json(property)
  } catch (err) {
    console.error('Error al crear propiedad:', err)
    res.status(500).json({
      error: 'Error al crear la propiedad',
      detalle: err.message,
    })
  }
})

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const existing = await propertyRepo.findById(req.params.id)

    if (!existing) {
      return res.status(404).json({ error: 'Propiedad no encontrada' })
    }

    const errors = validatePropertyInput(req.body)

    if (errors.length > 0) {
      return res.status(400).json({ error: 'Datos inválidos', detalles: errors })
    }

    const property = await propertyRepo.update(
      req.params.id,
      normalizePropertyInput(req.body),
    )

    res.json(property)
  } catch {
    res.status(500).json({ error: 'Error al actualizar la propiedad' })
  }
})

router.patch('/:id', requireAuth, async (req, res) => {
  try {
    const existing = await propertyRepo.findById(req.params.id)

    if (!existing) {
      return res.status(404).json({ error: 'Propiedad no encontrada' })
    }

    const errors = validatePropertyInput(req.body, { partial: true })

    if (errors.length > 0) {
      return res.status(400).json({ error: 'Datos inválidos', detalles: errors })
    }

    const merged = { ...existing, ...req.body }

    if (req.body.titulo !== undefined) merged.titulo = req.body.titulo.trim()
    if (req.body.ubicacion !== undefined) merged.ubicacion = req.body.ubicacion.trim()
    if (req.body.descripcion !== undefined) merged.descripcion = req.body.descripcion.trim()
    if (req.body.imagenes !== undefined) {
      merged.imagenes = req.body.imagenes.map((item) => item.trim()).filter(Boolean)
    }
    if (req.body.caracteristicas !== undefined) {
      merged.caracteristicas = req.body.caracteristicas
        .map((item) => item.trim())
        .filter(Boolean)
    }

    const { id, createdAt, updatedAt, ...updateData } = merged
    const property = await propertyRepo.update(req.params.id, updateData)
    res.json(property)
  } catch {
    res.status(500).json({ error: 'Error al actualizar la propiedad' })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const deleted = await propertyRepo.remove(req.params.id)

    if (!deleted) {
      return res.status(404).json({ error: 'Propiedad no encontrada' })
    }

    res.status(204).send()
  } catch {
    res.status(500).json({ error: 'Error al eliminar la propiedad' })
  }
})

export default router
