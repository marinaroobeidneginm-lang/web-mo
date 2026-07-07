import express from 'express'
import cors from 'cors'
import { existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import authRouter from './routes/auth.js'
import propertiesRouter from './routes/properties.js'
import uploadsRouter from './routes/uploads.js'
import { getContact } from './repositories/contactRepository.js'
import prisma from './lib/prisma.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.get('/api/contact', async (_req, res) => {
  try {
    const contact = await getContact()

    if (!contact) {
      return res.status(404).json({ error: 'Datos de contacto no encontrados' })
    }

    res.json(contact)
  } catch {
    res.status(500).json({ error: 'Error al obtener datos de contacto' })
  }
})

app.use('/api/auth', authRouter)
app.use('/api/properties', propertiesRouter)
app.use('/api/uploads', uploadsRouter)

app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.json({ status: 'ok', database: 'connected' })
  } catch {
    res.status(503).json({ status: 'error', database: 'disconnected' })
  }
})

const clientDistCandidates = [
  join(__dirname, 'public'),
  join(process.cwd(), 'server/public'),
  join(process.cwd(), 'client/dist'),
  join(__dirname, '../client/dist'),
]

const clientDist =
  clientDistCandidates.find((dir) => existsSync(join(dir, 'index.html'))) ??
  clientDistCandidates[0]

function sendDistFile(relativePath, res, next) {
  const filePath = join(clientDist, relativePath)
  if (!existsSync(filePath)) {
    next()
    return
  }
  res.sendFile(filePath)
}

// Siempre registrar rutas del frontend (Vercel no setea VERCEL/NODE_ENV de forma confiable).
app.get(/^\/assets\/.+/, (req, res, next) => {
  sendDistFile(req.path.slice(1), res, next)
})

app.get(/^(?!\/api).*/, (_req, res, next) => {
  sendDistFile('index.html', res, next)
})

export default app
