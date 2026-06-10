import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const DATA_FILE = join(__dirname, '..', 'data', 'properties.json')

/**
 * Capa de acceso a datos de propiedades.
 * Hoy persiste en JSON; para migrar a DB solo reemplazás
 * este archivo por una implementación con PostgreSQL/SQLite
 * manteniendo los mismos métodos exportados.
 */

function readAll() {
  const raw = readFileSync(DATA_FILE, 'utf-8')
  return JSON.parse(raw)
}

function writeAll(properties) {
  writeFileSync(DATA_FILE, JSON.stringify(properties, null, 2) + '\n', 'utf-8')
}

function applyFilters(properties, { tipo, operacion } = {}) {
  let result = properties

  if (tipo) {
    result = result.filter((p) => p.tipo.toLowerCase() === tipo.toLowerCase())
  }

  if (operacion) {
    result = result.filter(
      (p) => p.operacion.toLowerCase() === operacion.toLowerCase(),
    )
  }

  return result
}

export function findAll({ tipo, operacion } = {}) {
  return applyFilters(readAll(), { tipo, operacion })
}

export function findPaginated({ tipo, operacion, page = 1, limit = 9 } = {}) {
  const filtered = applyFilters(readAll(), { tipo, operacion })
  const total = filtered.length
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit)
  const safePage =
    totalPages === 0 ? 1 : Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * limit

  return {
    data: filtered.slice(start, start + limit),
    pagination: {
      page: safePage,
      limit,
      total,
      totalPages,
    },
  }
}

export function findById(id) {
  return readAll().find((p) => p.id === Number(id)) ?? null
}

export function create(data) {
  const properties = readAll()
  const nextId = properties.reduce((max, p) => Math.max(max, p.id), 0) + 1
  const property = { id: nextId, ...data }

  properties.push(property)
  writeAll(properties)

  return property
}

export function update(id, data) {
  const properties = readAll()
  const index = properties.findIndex((p) => p.id === Number(id))

  if (index === -1) return null

  const updated = { ...properties[index], ...data, id: Number(id) }
  properties[index] = updated
  writeAll(properties)

  return updated
}

export function remove(id) {
  const properties = readAll()
  const index = properties.findIndex((p) => p.id === Number(id))

  if (index === -1) return false

  properties.splice(index, 1)
  writeAll(properties)

  return true
}
