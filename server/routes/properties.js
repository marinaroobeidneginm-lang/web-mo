import { Router } from 'express'
import * as propertyRepo from '../repositories/propertyRepository.js'
import {
  normalizePropertyInput,
  validatePropertyInput,
} from '../utils/propertySchema.js'

const router = Router()

router.get('/', (req, res) => {
  const { tipo, operacion } = req.query
  const properties = propertyRepo.findAll({ tipo, operacion })
  res.json(properties)
})

router.get('/:id', (req, res) => {
  const property = propertyRepo.findById(req.params.id)

  if (!property) {
    return res.status(404).json({ error: 'Propiedad no encontrada' })
  }

  res.json(property)
})

router.post('/', (req, res) => {
  const errors = validatePropertyInput(req.body)

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Datos inválidos', detalles: errors })
  }

  const property = propertyRepo.create(normalizePropertyInput(req.body))
  res.status(201).json(property)
})

router.put('/:id', (req, res) => {
  const existing = propertyRepo.findById(req.params.id)

  if (!existing) {
    return res.status(404).json({ error: 'Propiedad no encontrada' })
  }

  const errors = validatePropertyInput(req.body)

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Datos inválidos', detalles: errors })
  }

  const property = propertyRepo.update(
    req.params.id,
    normalizePropertyInput(req.body),
  )

  res.json(property)
})

router.patch('/:id', (req, res) => {
  const existing = propertyRepo.findById(req.params.id)

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
  if (req.body.imagen !== undefined) merged.imagen = req.body.imagen.trim()
  if (req.body.caracteristicas !== undefined) {
    merged.caracteristicas = req.body.caracteristicas
      .map((item) => item.trim())
      .filter(Boolean)
  }

  const property = propertyRepo.update(req.params.id, merged)
  res.json(property)
})

router.delete('/:id', (req, res) => {
  const deleted = propertyRepo.remove(req.params.id)

  if (!deleted) {
    return res.status(404).json({ error: 'Propiedad no encontrada' })
  }

  res.status(204).send()
})

export default router
