import bcrypt from 'bcryptjs'

const password = process.argv[2]

if (!password) {
  console.error('Uso: node scripts/hash-password.js <contraseña>')
  process.exit(1)
}

const hash = await bcrypt.hash(password, 10)
console.log(hash)
