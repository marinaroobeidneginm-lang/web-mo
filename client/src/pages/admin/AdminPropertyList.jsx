import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { deleteProperty, fetchProperties } from '../../services/propertyApi'
import { formatPrice } from '../../utils/formatPrice'
import { getPrimaryImage } from '../../utils/propertyImages'

export default function AdminPropertyList() {
  const location = useLocation()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [successMessage, setSuccessMessage] = useState(
    location.state?.message ?? null,
  )

  const loadProperties = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchProperties()
      setProperties(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProperties()
  }, [loadProperties])

  const handleDelete = async (property) => {
    const confirmed = window.confirm(
      `¿Eliminar "${property.titulo}"? Esta acción no se puede deshacer.`,
    )
    if (!confirmed) return

    setDeletingId(property.id)

    try {
      await deleteProperty(property.id)
      setProperties((prev) => prev.filter((p) => p.id !== property.id))
    } catch (err) {
      alert(err.message)
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Propiedades</h2>
          <p className="mt-1 text-sm text-slate-500">
            {properties.length} propiedad{properties.length !== 1 ? 'es' : ''}{' '}
            en el catálogo
          </p>
        </div>
        <Link
          to="/admin/propiedades/nueva"
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          + Nueva propiedad
        </Link>
      </div>

      {successMessage && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Propiedad</th>
                <th className="px-4 py-3 font-semibold">Tipo</th>
                <th className="px-4 py-3 font-semibold">Operación</th>
                <th className="px-4 py-3 font-semibold">Precio</th>
                <th className="px-4 py-3 font-semibold">Ubicación</th>
                <th className="px-4 py-3 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={getPrimaryImage(property)}
                        alt=""
                        className="h-12 w-16 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium text-slate-800">
                          {property.titulo}
                        </p>
                        <p className="text-xs text-slate-400">ID {property.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{property.tipo}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        property.operacion === 'Venta'
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {property.operacion}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {formatPrice(property.precio, property.moneda)}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {property.ubicacion}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/propiedades/${property.id}`}
                        target="_blank"
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                      >
                        Ver
                      </Link>
                      <Link
                        to={`/admin/propiedades/${property.id}/editar`}
                        className="rounded-lg border border-primary-200 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-50"
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(property)}
                        disabled={deletingId === property.id}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        {deletingId === property.id ? '...' : 'Eliminar'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {properties.length === 0 && !error && (
          <div className="px-6 py-12 text-center text-slate-500">
            No hay propiedades cargadas.{' '}
            <Link
              to="/admin/propiedades/nueva"
              className="font-medium text-primary-600 hover:underline"
            >
              Crear la primera
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
