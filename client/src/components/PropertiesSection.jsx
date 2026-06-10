import { useMemo, useState } from 'react'
import PropertyCard from './PropertyCard'
import PropertyFilters from './PropertyFilters'

function filterProperties(properties, operacion, tipo) {
  return properties.filter((property) => {
    const matchOperacion =
      operacion === 'Todos' || property.operacion === operacion
    const matchTipo = tipo === 'Todos' || property.tipo === tipo
    return matchOperacion && matchTipo
  })
}

export default function PropertiesSection({ properties, loading, error }) {
  const [operacion, setOperacion] = useState('Todos')
  const [tipo, setTipo] = useState('Todos')

  const filteredProperties = useMemo(
    () => filterProperties(properties, operacion, tipo),
    [properties, operacion, tipo],
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

        {!loading && !error && (
          <>
            <PropertyFilters
              operacion={operacion}
              tipo={tipo}
              onOperacionChange={setOperacion}
              onTipoChange={setTipo}
              resultCount={filteredProperties.length}
            />

            {filteredProperties.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                <p className="text-slate-600">
                  No encontramos propiedades con esos filtros.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOperacion('Todos')
                    setTipo('Todos')
                  }}
                  className="mt-4 text-sm font-medium text-primary-600 hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
