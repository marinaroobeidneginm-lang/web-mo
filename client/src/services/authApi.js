import { clearToken, getToken, setToken } from '../utils/authStorage'

async function handleResponse(response) {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Error en la autenticación')
  }

  return data
}

export async function login(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const data = await handleResponse(response)
  setToken(data.token)
  return data
}

export function logout() {
  clearToken()
}

export async function fetchCurrentUser() {
  const token = getToken()
  if (!token) return null

  const response = await fetch('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    clearToken()
    return null
  }

  return handleResponse(response)
}
