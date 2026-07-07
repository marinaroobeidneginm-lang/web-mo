import { EMPTY_PROPERTY_FORM } from '../constants/propertyOptions'
import { getPropertyImages } from './propertyImages'

export function propertyToForm(property) {
  if (!property) return { ...EMPTY_PROPERTY_FORM }

  return {
    titulo: property.titulo ?? '',
    tipo: property.tipo ?? 'Departamento',
    operacion: property.operacion ?? 'Venta',
    precio: String(property.precio ?? ''),
    moneda: property.moneda ?? 'USD',
    ubicacion: property.ubicacion ?? '',
    metros: String(property.metros ?? ''),
    ambientes: String(property.ambientes ?? 0),
    dormitorios: String(property.dormitorios ?? 0),
    banos: String(property.banos ?? 0),
    descripcion: property.descripcion ?? '',
    imagenes: getPropertyImages(property),
    externalImageUrl: '',
    caracteristicas: (property.caracteristicas ?? []).join('\n'),
  }
}

export function formToPayload(form) {
  const esTerreno = form.tipo === 'Terreno'

  return {
    titulo: form.titulo.trim(),
    tipo: form.tipo,
    operacion: form.operacion,
    precio: Number(form.precio),
    moneda: form.moneda,
    ubicacion: form.ubicacion.trim(),
    metros: Number(form.metros),
    ambientes: esTerreno ? 0 : Number(form.ambientes || 0),
    dormitorios: esTerreno ? 0 : Number(form.dormitorios || 0),
    banos: esTerreno ? 0 : Number(form.banos || 0),
    descripcion: form.descripcion.trim(),
    imagenes: form.imagenes,
    caracteristicas: form.caracteristicas
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean),
  }
}
