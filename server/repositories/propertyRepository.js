import prisma from '../lib/prisma.js'

function normalizeCaracteristicas(value) {
  if (Array.isArray(value)) return value
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

function buildWhere({ tipo, operacion } = {}) {
  const where = {}

  if (tipo) {
    where.tipo = { equals: tipo, mode: 'insensitive' }
  }

  if (operacion) {
    where.operacion = { equals: operacion, mode: 'insensitive' }
  }

  return where
}

function prepareData(data) {
  const { caracteristicas, ...rest } = data
  return {
    ...rest,
    caracteristicas: normalizeCaracteristicas(caracteristicas),
  }
}

export async function findAll({ tipo, operacion } = {}) {
  return prisma.property.findMany({
    where: buildWhere({ tipo, operacion }),
    orderBy: { id: 'desc' },
  })
}

export async function findPaginated({ tipo, operacion, page = 1, limit = 9 } = {}) {
  const where = buildWhere({ tipo, operacion })
  const total = await prisma.property.count({ where })
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit)
  const safePage =
    totalPages === 0 ? 1 : Math.min(Math.max(1, page), totalPages)

  const data = await prisma.property.findMany({
    where,
    orderBy: { id: 'desc' },
    skip: (safePage - 1) * limit,
    take: limit,
  })

  return {
    data,
    pagination: {
      page: safePage,
      limit,
      total,
      totalPages,
    },
  }
}

export async function findById(id) {
  return prisma.property.findUnique({
    where: { id: Number(id) },
  })
}

export async function create(data) {
  return prisma.property.create({ data: prepareData(data) })
}

export async function update(id, data) {
  try {
    return await prisma.property.update({
      where: { id: Number(id) },
      data: prepareData(data),
    })
  } catch {
    return null
  }
}

export async function remove(id) {
  try {
    await prisma.property.delete({
      where: { id: Number(id) },
    })
    return true
  } catch {
    return false
  }
}
