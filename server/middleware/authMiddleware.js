import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/auth.js'

export function requireAuth(req, res, next) {
  const header = req.headers.authorization

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado. Iniciá sesión.' })
  }

  const token = header.slice(7)

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = { email: payload.sub }
    next()
  } catch {
    return res.status(401).json({ error: 'Sesión expirada o inválida.' })
  }
}
