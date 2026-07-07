import { clearToken, getToken } from '../utils/authStorage'

export async function uploadPropertyImage(file) {
  const formData = new FormData()
  formData.append('image', file)

  const headers = {}
  const token = getToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch('/api/uploads/image', {
    method: 'POST',
    headers,
    body: formData,
  })

  if (response.status === 401 && token) {
    clearToken()
    if (!window.location.pathname.startsWith('/admin/login')) {
      window.location.href = '/admin/login'
    }
    throw new Error('Sesión expirada. Volvé a iniciar sesión.')
  }

  const data = await response.json()

  if (!response.ok) {
    const message = data.detalle || data.error || 'Error al subir la imagen'
    throw new Error(message)
  }

  return data.url
}
