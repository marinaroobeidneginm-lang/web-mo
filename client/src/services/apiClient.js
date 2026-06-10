import { clearToken, getToken } from '../utils/authStorage'

export async function apiRequest(url, options = {}) {
  const headers = {
    ...options.headers,
  }

  const token = getToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  if (options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(url, { ...options, headers })

  if (response.status === 401 && token) {
    clearToken()
    if (!window.location.pathname.startsWith('/admin/login')) {
      window.location.href = '/admin/login'
    }
    throw new Error('Sesión expirada. Volvé a iniciar sesión.')
  }

  if (response.status === 204) return null

  const data = await response.json()

  if (!response.ok) {
    const message = data.detalles?.join('. ') || data.error || 'Error en la petición'
    throw new Error(message)
  }

  return data
}
