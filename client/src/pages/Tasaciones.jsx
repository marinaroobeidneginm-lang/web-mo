import { useMemo, useState } from 'react'
import Layout from '../components/Layout'
import { useContact } from '../hooks/useContact'

const TO_EMAIL = 'ginomarinaro.mp@gmail.com'

function normalizeWhatsapp(value) {
  return String(value ?? '').replace(/[^0-9]/g, '')
}

function buildWhatsappUrl(phone, text) {
  const digits = normalizeWhatsapp(phone)
  if (!digits) return null
  const query = text ? `?text=${encodeURIComponent(text)}` : ''
  return `https://wa.me/${digits}${query}`
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function buildEmailContent(email, mensaje) {
  const subject = 'Consulta por tasación'
  const body = [
    'Hola! Quisiera solicitar una tasación.',
    '',
    `Mi email: ${email.trim()}`,
    mensaje.trim() ? `Mensaje: ${mensaje.trim()}` : null,
    '',
    'Gracias!',
  ]
    .filter(Boolean)
    .join('\n')

  return { subject, body }
}

function openEmailClient({ to, subject, body }) {
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  const opened = window.open(gmailUrl, '_blank', 'noopener,noreferrer')
  if (!opened) {
    window.location.href = mailtoUrl
  }
}

export default function Tasaciones() {
  const { contact } = useContact()
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState(null)
  const [opened, setOpened] = useState(false)

  const whatsappUrl = useMemo(() => {
    return buildWhatsappUrl(
      contact?.whatsapp,
      'Hola! Quisiera solicitar una tasación. ¿Me podés asesorar?',
    )
  }, [contact?.whatsapp])

  const handleSendEmail = () => {
    if (!email.trim()) {
      setError('Ingresá tu email para continuar')
      setOpened(false)
      return
    }

    if (!isValidEmail(email)) {
      setError('Ingresá un email válido')
      setOpened(false)
      return
    }

    setError(null)
    const { subject, body } = buildEmailContent(email, mensaje)
    openEmailClient({ to: TO_EMAIL, subject, body })
    setOpened(true)
  }

  return (
    <Layout>
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">
              Tasaciones
            </p>
            <h1 className="mt-4 text-3xl font-bold text-slate-800 sm:text-4xl">
              Contactate con nosotros para hacer tu tasación
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
              Te ayudamos a conocer el valor real de tu propiedad en el mercado
              actual. Coordinamos una visita, analizamos ubicación, estado y
              comparables, y te damos una estimación clara para que tomes la
              mejor decisión.
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-800">
                  WhatsApp
                </h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Si querés, escribinos y coordinamos una tasación.
                </p>
                <a
                  href={whatsappUrl ?? 'https://wa.me/543812797777'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  Hablar por WhatsApp
                </a>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-800">Email</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Dejanos tu email y te abrimos un mensaje para enviarlo a{' '}
                  <span className="font-medium text-slate-800">{TO_EMAIL}</span>.
                </p>

                <div className="mt-5 grid gap-3">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">
                      Tu email
                    </span>
                    <input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError(null)
                        setOpened(false)
                      }}
                      type="email"
                      required
                      placeholder="tuemail@gmail.com"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">
                      Mensaje (opcional)
                    </span>
                    <textarea
                      value={mensaje}
                      onChange={(e) => {
                        setMensaje(e.target.value)
                        setOpened(false)
                      }}
                      rows={4}
                      placeholder="Contanos zona, tipo de propiedad y si tenés documentación a mano."
                      className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                    />
                  </label>

                  {error && (
                    <p className="text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Enviar email
                  </button>

                  {opened && !error && (
                    <p className="text-sm text-primary-700">
                      Se abrió Gmail con el mensaje preparado. Revisá la pestaña
                      nueva y apretá Enviar para completar el contacto.
                    </p>
                  )}

                  <p className="text-xs text-slate-500">
                    Si no se abre, escribinos directamente a{' '}
                    <a
                      href={`mailto:${TO_EMAIL}`}
                      className="font-medium text-primary-600 hover:underline"
                    >
                      {TO_EMAIL}
                    </a>
                    .
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
