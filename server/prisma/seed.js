import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import prisma from '../lib/prisma.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const dataDir = join(__dirname, '..', 'data')

function loadJson(filename) {
  const raw = readFileSync(join(dataDir, filename), 'utf-8')
  return JSON.parse(raw)
}

async function main() {
  const properties = loadJson('properties.json')
  const contact = loadJson('contact.json')

  await prisma.property.deleteMany()
  await prisma.contact.deleteMany()

  for (const property of properties) {
    const { id, caracteristicas, ...data } = property
    await prisma.property.create({
      data: {
        id,
        ...data,
        caracteristicas: caracteristicas ?? [],
      },
    })
  }

  // Tras insertar IDs explícitos, sincronizar la secuencia de autoincremento
  await prisma.$executeRaw`
    SELECT setval(
      pg_get_serial_sequence('"Property"', 'id'),
      COALESCE((SELECT MAX(id) FROM "Property"), 1)
    )
  `

  await prisma.contact.create({
    data: {
      id: 1,
      nombre: contact.nombre,
      direccion: contact.direccion,
      telefono: contact.telefono,
      whatsapp: contact.whatsapp,
      email: contact.email,
      horario: contact.horario,
      instagram: contact.redes.instagram,
      facebook: contact.redes.facebook,
    },
  })

  console.log(`Seed completado: ${properties.length} propiedades y datos de contacto.`)
}

main()
  .catch((error) => {
    console.error('Error en seed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
