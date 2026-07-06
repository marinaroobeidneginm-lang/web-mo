import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import authRouter from './routes/auth.js'
import propertiesRouter from './routes/properties.js'
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

app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.json({ status: 'ok', database: 'connected' })
  } catch {
    res.status(503).json({ status: 'error', database: 'disconnected' })
  }
})

const clientDist = join(__dirname, '../client/dist')

if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
  app.use(express.static(clientDist))

  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(join(clientDist, 'index.html'))
  })
}

export default app
