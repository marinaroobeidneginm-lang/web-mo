async function handleResponse(response) {
  if (response.status === 204) return null

  const data = await response.json()

  if (!response.ok) {
    const message = data.detalles?.join('. ') || data.error || 'Error en la petición'
    throw new Error(message)
  }

  return data
}

export async function fetchProperties() {
  const response = await fetch('/api/properties')
  return handleResponse(response)
}

export async function fetchProperty(id) {
  const response = await fetch(`/api/properties/${id}`)
  return handleResponse(response)
}

export async function createProperty(payload) {
  const response = await fetch('/api/properties', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResponse(response)
}

export async function updateProperty(id, payload) {
  const response = await fetch(`/api/properties/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResponse(response)
}

export async function deleteProperty(id) {
  const response = await fetch(`/api/properties/${id}`, {
    method: 'DELETE',
  })
  return handleResponse(response)
}
