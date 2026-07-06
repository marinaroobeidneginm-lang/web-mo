import prisma from '../lib/prisma.js'

function toApiFormat(contact) {
  if (!contact) return null

  return {
    nombre: contact.nombre,
    direccion: contact.direccion,
    telefono: contact.telefono,
    whatsapp: contact.whatsapp,
    email: contact.email,
    horario: contact.horario,
    redes: {
      instagram: contact.instagram,
      facebook: contact.facebook,
    },
  }
}

export async function getContact() {
  const contact = await prisma.contact.findFirst()
  return toApiFormat(contact)
}
