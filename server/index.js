import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import authRouter from './routes/auth.js'
import propertiesRouter from './routes/properties.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const loadJson = (filename) => {
  const data = readFileSync(join(__dirname, 'data', filename), 'utf-8')
  return JSON.parse(data)
}

app.get('/api/contact', (_req, res) => {
  res.json(loadJson('contact.json'))
})

app.use('/api/auth', authRouter)
app.use('/api/properties', propertiesRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
