import { Router } from 'express'
import * as propertyRepo from '../repositories/propertyRepository.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import {
  normalizePropertyInput,
  validatePropertyInput,
} from '../utils/propertySchema.js'

const router = Router()

router.get('/', (req, res, next) => {
  const { tipo, operacion, page, limit } = req.query

  if (page || limit) {
    const result = propertyRepo.findPaginated({
      tipo,
      operacion,
      page: Number(page) || 1,
      limit: Number(limit) || 9,
    })
    return res.json(result)
  }

  next()
}, requireAuth, (req, res) => {
  const { tipo, operacion } = req.query
  res.json(propertyRepo.findAll({ tipo, operacion }))
})

router.get('/:id', (req, res) => {
  const property = propertyRepo.findById(req.params.id)

  if (!property) {
    return res.status(404).json({ error: 'Propiedad no encontrada' })
  }

  res.json(property)
})

router.post('/', requireAuth, (req, res) => {
  const errors = validatePropertyInput(req.body)

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Datos inválidos', detalles: errors })
  }

  const property = propertyRepo.create(normalizePropertyInput(req.body))
  res.status(201).json(property)
})

router.put('/:id', requireAuth, (req, res) => {
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

router.patch('/:id', requireAuth, (req, res) => {
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

router.delete('/:id', requireAuth, (req, res) => {
  const deleted = propertyRepo.remove(req.params.id)

  if (!deleted) {
    return res.status(404).json({ error: 'Propiedad no encontrada' })
  }

  res.status(204).send()
})

export default router
