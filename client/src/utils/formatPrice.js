export function formatPrice(precio, moneda) {
  if (moneda === 'USD') {
    return `USD ${precio.toLocaleString('es-AR')}`
  }
  return `$ ${precio.toLocaleString('es-AR')}`
}
