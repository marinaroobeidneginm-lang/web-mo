import { Link } from 'react-router-dom'
import logo from '../assets/logo_mo_neg_onm.jpg'
import SectionLink from './SectionLink'

export default function Header({ nombre }) {
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
            {"Marinaro Obeid"}
          </span>
          <span className="text-lg font-semibold text-primary-600">
            {" | Negocios Inmobiliarios"}
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
        </nav>

        <SectionLink
          section="contacto"
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          Consultar
        </SectionLink>
      </div>
    </header>
  )
}
