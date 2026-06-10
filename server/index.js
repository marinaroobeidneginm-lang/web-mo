import express from 'express'
import cors from 'cors'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

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

app.get('/api/properties', (req, res) => {
  let properties = loadJson('properties.json')

  const { tipo, operacion } = req.query

  if (tipo) {
    properties = properties.filter(
      (p) => p.tipo.toLowerCase() === tipo.toLowerCase(),
    )
  }

  if (operacion) {
    properties = properties.filter(
      (p) => p.operacion.toLowerCase() === operacion.toLowerCase(),
    )
  }

  res.json(properties)
})

app.get('/api/properties/:id', (req, res) => {
  const properties = loadJson('properties.json')
  const property = properties.find((p) => p.id === Number(req.params.id))

  if (!property) {
    return res.status(404).json({ error: 'Propiedad no encontrada' })
  }

  res.json(property)
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
