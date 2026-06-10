import { Link, NavLink, Outlet } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-primary-600 text-white'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
              Panel de administración
            </p>
            <h1 className="text-lg font-bold text-slate-800">
              Marinaro Obeid Inmobiliaria
            </h1>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            <NavLink to="/admin" end className={navLinkClass}>
              Propiedades
            </NavLink>
            <NavLink to="/admin/propiedades/nueva" className={navLinkClass}>
              Nueva propiedad
            </NavLink>
            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
            >
              Ver sitio público →
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Outlet />
      </div>
    </div>
  )
}
