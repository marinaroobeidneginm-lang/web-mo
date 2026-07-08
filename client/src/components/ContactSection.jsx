function ContactItem({ icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-sm">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-lg">
        {icon}
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block no-underline">
        {content}
      </a>
    )
  }

  return content
}

export default function ContactSection({ contact, loading, error }) {
  if (loading) {
    return (
      <section id="contacto" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
        </div>
      </section>
    )
  }

  if (error || !contact) {
    return (
      <section id="contacto" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center text-red-700 sm:px-6">
          No se pudieron cargar los datos de contacto.
        </div>
      </section>
    )
  }

  return (
    <section id="contacto" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-800">Contacto</h2>
          <p className="mt-3 text-slate-600">
            Estamos para ayudarte a encontrar tu próximo hogar
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {/* <ContactItem icon="📍" label="Dirección" value={contact.direccion} /> */}
          {/* <ContactItem
            icon="📞"
            label="Teléfono"
            value={contact.telefono}
            href={`tel:${contact.telefono.replace(/\s/g, '')}`}
          /> */}
          <ContactItem
            icon="💬"
            label="WhatsApp"
            value={contact.whatsapp}
            href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
          />
          <ContactItem
            icon="✉️"
            label="Email"
            value={contact.email}
            href={`mailto:${contact.email}`}
          />
          <ContactItem icon="🕐" label="Horario" value={contact.horario} />
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-lg">
              🌐
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Redes sociales
              </p>
              <div className="mt-2 flex gap-4">
                <a
                  href={contact.redes.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Instagram
                </a>
                <a
                  href={contact.redes.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
