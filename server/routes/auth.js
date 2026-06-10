import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD_HASH,
  JWT_EXPIRES_IN,
  JWT_SECRET,
} from '../config/auth.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' })
  }

  if (!ADMIN_PASSWORD_HASH) {
    return res.status(500).json({
      error: 'ADMIN_PASSWORD_HASH no está configurado en el servidor',
    })
  }

  const emailMatch = email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
  const passwordMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)

  if (!emailMatch || !passwordMatch) {
    return res.status(401).json({ error: 'Credenciales incorrectas' })
  }

  const token = jwt.sign({ sub: ADMIN_EMAIL }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })

  res.json({
    token,
    user: { email: ADMIN_EMAIL },
  })
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user })
})

export default router
