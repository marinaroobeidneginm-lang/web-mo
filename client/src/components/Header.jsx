import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo_mo_recortado.jpg'
import SectionLink from './SectionLink'

function BurgerIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </>
      )}
    </svg>
  )
}

export default function Header({ nombre }) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    const close = () => setMobileOpen(false)
    window.addEventListener('hashchange', close)
    window.addEventListener('popstate', close)
    return () => {
      window.removeEventListener('hashchange', close)
      window.removeEventListener('popstate', close)
    }
  }, [])

  useEffect(() => {
    if (!mobileOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

  const links = [
    { section: 'inicio', label: 'Inicio' },
    { section: 'propiedades', label: 'Propiedades' },
    { section: 'contacto', label: 'Contacto' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <SectionLink section="inicio" className="flex items-center gap-2 no-underline">
          <img
            src={logo}
            alt="Logo Marinaro Obeid"
            className="h-9 w-9 rounded-lg object-cover"
          />
          <span className="text-xl font-bold text-primary-700">
            {nombre ?? 'Marinaro Obeid Inmobiliaria'}
          </span>
        </SectionLink>

        <nav className="hidden gap-8 sm:flex">
          {links.map((link) => (
            <SectionLink
              key={link.section}
              section={link.section}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary-600"
            >
              {link.label}
            </SectionLink>
          ))}
          <Link
            to="/nosotros"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-primary-600"
          >
            Nosotros
          </Link>
          <Link
            to="/tasaciones"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-primary-600"
          >
            Tasaciones
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <SectionLink
            section="contacto"
            className="hidden rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 sm:inline-flex"
          >
            Consultar
          </SectionLink>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-700 transition-colors hover:bg-slate-50 sm:hidden"
          >
            <BurgerIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] sm:hidden"
          />
          <div className="absolute left-0 right-0 z-50 border-t border-slate-200/80 bg-white/95 shadow-lg sm:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 sm:px-6">
              {links.map((link) => (
                <SectionLink
                  key={link.section}
                  section={link.section}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-primary-600"
                >
                  {link.label}
                </SectionLink>
              ))}
              <Link
                to="/nosotros"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-primary-600"
              >
                Nosotros
              </Link>
              <Link
                to="/tasaciones"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-primary-600"
              >
                Tasaciones
              </Link>

              <div className="pt-2">
                <SectionLink
                  section="contacto"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  Consultar
                </SectionLink>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
