import 'dotenv/config'
import prisma from '../lib/prisma.js'

try {
  await prisma.$executeRaw`
    SELECT setval(
      pg_get_serial_sequence('"Property"', 'id'),
      COALESCE((SELECT MAX(id) FROM "Property"), 1)
    )
  `
  console.log('✅ Secuencia de Property.id sincronizada.')
} catch (error) {
  console.error('❌ Error:', error.message)
  process.exit(1)
} finally {
  await prisma.$disconnect()
}
