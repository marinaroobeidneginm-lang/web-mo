import { useState } from 'react'
import PropertyCard from './PropertyCard'
import PropertyFilters from './PropertyFilters'
import Pagination from './Pagination'
import { usePaginatedProperties } from '../hooks/usePaginatedProperties'

function scrollToProperties() {
  document.getElementById('propiedades')?.scrollIntoView({ behavior: 'smooth' })
}

export default function PropertiesSection() {
  const [operacion, setOperacion] = useState('Todos')
  const [tipo, setTipo] = useState('Todos')
  const [page, setPage] = useState(1)

  const { properties, pagination, loading, error } = usePaginatedProperties({
    page,
    operacion,
    tipo,
  })

  const handleOperacionChange = (value) => {
    setOperacion(value)
    setPage(1)
  }

  const handleTipoChange = (value) => {
    setTipo(value)
    setPage(1)
  }

  const handlePageChange = (nextPage) => {
    setPage(nextPage)
    scrollToProperties()
  }

  const handleClearFilters = () => {
    setOperacion('Todos')
    setTipo('Todos')
    setPage(1)
  }

  const rangeStart =
    pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1
  const rangeEnd = Math.min(
    pagination.page * pagination.limit,
    pagination.total,
  )

  return (
    <section id="propiedades" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-800">
            Propiedades disponibles
          </h2>
          <p className="mt-3 text-slate-600">
            Explorá nuestra selección de inmuebles en venta y alquiler
          </p>
        </div>

        <PropertyFilters
          operacion={operacion}
          tipo={tipo}
          onOperacionChange={handleOperacionChange}
          onTipoChange={handleTipoChange}
          resultCount={pagination.total}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
        />

        {loading && (
          <div className="flex justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-red-700">
            {error}. Asegurate de que el servidor esté corriendo.
          </div>
        )}

        {!loading && !error && properties.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {!loading && !error && properties.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <p className="text-slate-600">
              No encontramos propiedades con esos filtros.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-4 text-sm font-medium text-primary-600 hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
