export function getPropertyImages(property) {
  if (!property) return []
  if (Array.isArray(property.imagenes) && property.imagenes.length > 0) {
    return property.imagenes
  }
  if (property.imagen) return [property.imagen]
  return []
}

export function getPrimaryImage(property) {
  return getPropertyImages(property)[0] ?? ''
}
