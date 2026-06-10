import { apiRequest } from './apiClient'

export async function fetchProperties() {
  return apiRequest('/api/properties')
}

export async function fetchPaginatedProperties({
  page = 1,
  limit = 9,
  tipo,
  operacion,
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })

  if (tipo && tipo !== 'Todos') params.set('tipo', tipo)
  if (operacion && operacion !== 'Todos') params.set('operacion', operacion)

  return apiRequest(`/api/properties?${params}`)
}

export async function fetchProperty(id) {
  return apiRequest(`/api/properties/${id}`)
}

export async function createProperty(payload) {
  return apiRequest('/api/properties', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function updateProperty(id, payload) {
  return apiRequest(`/api/properties/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function deleteProperty(id) {
  return apiRequest(`/api/properties/${id}`, {
    method: 'DELETE',
  })
}
