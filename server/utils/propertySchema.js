export const TIPOS_VALIDOS = [
  'Departamento',
  'Casa',
  'PH',
  'Terreno',
  'Comercial',
]

export const OPERACIONES_VALIDAS = ['Venta', 'Alquiler']

export const MONEDAS_VALIDAS = ['USD', 'ARS']

const CAMPOS_REQUERIDOS = [
  'titulo',
  'tipo',
  'operacion',
  'precio',
  'moneda',
  'ubicacion',
  'metros',
  'descripcion',
  'imagen',
]

export function validatePropertyInput(body, { partial = false } = {}) {
  const errors = []

  if (!body || typeof body !== 'object') {
    return ['El cuerpo de la petición debe ser un objeto JSON']
  }

  const campos = partial ? Object.keys(body) : CAMPOS_REQUERIDOS

  if (!partial) {
    for (const campo of CAMPOS_REQUERIDOS) {
      if (body[campo] === undefined || body[campo] === null || body[campo] === '') {
        errors.push(`El campo "${campo}" es obligatorio`)
      }
    }
  }

  if (body.titulo !== undefined && typeof body.titulo !== 'string') {
    errors.push('El campo "titulo" debe ser texto')
  }

  if (body.tipo !== undefined && !TIPOS_VALIDOS.includes(body.tipo)) {
    errors.push(`El campo "tipo" debe ser uno de: ${TIPOS_VALIDOS.join(', ')}`)
  }

  if (body.operacion !== undefined && !OPERACIONES_VALIDAS.includes(body.operacion)) {
    errors.push(
      `El campo "operacion" debe ser uno de: ${OPERACIONES_VALIDAS.join(', ')}`,
    )
  }

  if (body.moneda !== undefined && !MONEDAS_VALIDAS.includes(body.moneda)) {
    errors.push(`El campo "moneda" debe ser uno de: ${MONEDAS_VALIDAS.join(', ')}`)
  }

  if (body.precio !== undefined && (typeof body.precio !== 'number' || body.precio <= 0)) {
    errors.push('El campo "precio" debe ser un número mayor a 0')
  }

  if (body.metros !== undefined && (typeof body.metros !== 'number' || body.metros <= 0)) {
    errors.push('El campo "metros" debe ser un número mayor a 0')
  }

  for (const campo of ['ambientes', 'dormitorios', 'banos']) {
    if (body[campo] !== undefined) {
      if (typeof body[campo] !== 'number' || body[campo] < 0) {
        errors.push(`El campo "${campo}" debe ser un número mayor o igual a 0`)
      }
    }
  }

  if (body.caracteristicas !== undefined) {
    if (!Array.isArray(body.caracteristicas)) {
      errors.push('El campo "caracteristicas" debe ser un array de textos')
    } else if (body.caracteristicas.some((item) => typeof item !== 'string')) {
      errors.push('Cada característica debe ser texto')
    }
  }

  if (partial && campos.length === 0) {
    errors.push('Debés enviar al menos un campo para actualizar')
  }

  return errors
}

export function normalizePropertyInput(body) {
  const tipo = body.tipo ?? 'Departamento'
  const esTerreno = tipo === 'Terreno'

  return {
    titulo: body.titulo?.trim(),
    tipo,
    operacion: body.operacion,
    precio: body.precio,
    moneda: body.moneda,
    ubicacion: body.ubicacion?.trim(),
    metros: body.metros,
    ambientes: body.ambientes ?? (esTerreno ? 0 : 1),
    dormitorios: body.dormitorios ?? (esTerreno ? 0 : 0),
    banos: body.banos ?? (esTerreno ? 0 : 1),
    descripcion: body.descripcion?.trim(),
    imagen: body.imagen?.trim(),
    caracteristicas: Array.isArray(body.caracteristicas)
      ? body.caracteristicas.map((item) => item.trim()).filter(Boolean)
      : [],
  }
}
