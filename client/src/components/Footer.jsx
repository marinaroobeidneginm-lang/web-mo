import { Link } from 'react-router-dom'
import SectionLink from './SectionLink'

export default function Footer({ nombre }) {
  const year = new Date().getFullYear()

  const links = [
    { section: 'inicio', label: 'Inicio' },
    { section: 'propiedades', label: 'Propiedades' },
    { section: 'contacto', label: 'Contacto' },
  ]

  return (
    <footer className="border-t border-slate-200 bg-slate-800 py-8 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <p className="text-sm">
          © {year} {nombre}. Todos los derechos reservados.
        </p>
        <nav className="flex gap-6 text-sm">
          {links.map((link) => (
            <SectionLink
              key={link.section}
              section={link.section}
              className="hover:text-white"
            >
              {link.label}
            </SectionLink>
          ))}
          <Link to="/nosotros" className="hover:text-white">
            Nosotros
          </Link>
          <Link to="/tasaciones" className="hover:text-white">
            Tasaciones
          </Link>
        </nav>
      </div>
    </footer>
  )
}
