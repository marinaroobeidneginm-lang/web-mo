import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import SectionLink from '../components/SectionLink'
import { useProperty } from '../hooks/useProperty'
import { useContact } from '../hooks/useContact'
import { formatPrice } from '../utils/formatPrice'

function DetailItem({ label, value }) {
  if (value === undefined || value === null || value === '') return null

  return (
    <div className="rounded-lg bg-slate-50 px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  )
}

export default function PropertyDetail() {
  const { id } = useParams()
  const { property, loading, error } = useProperty(id)
  const { contact } = useContact()

  const whatsappUrl = contact?.whatsapp
    ? `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
        `Hola, me interesa la propiedad: ${property?.titulo ?? ''}`,
      )}`
    : '/#contacto'

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionLink
          section="propiedades"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:underline"
        >
          ← Volver a propiedades
        </SectionLink>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
            <h1 className="text-xl font-semibold text-red-800">
              Propiedad no encontrada
            </h1>
            <p className="mt-2 text-red-600">{error}</p>
            <SectionLink
              section="propiedades"
              className="mt-4 inline-block text-sm font-medium text-primary-600 hover:underline"
            >
              Ver todas las propiedades
            </SectionLink>
          </div>
        )}

        {!loading && !error && property && (
          <article>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-[16/7] overflow-hidden sm:aspect-[21/9]">
                <img
                  src={property.imagen}
                  alt={property.titulo}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-4 top-4 flex gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      property.operacion === 'Venta'
                        ? 'bg-primary-600 text-white'
                        : 'bg-accent-500 text-white'
                    }`}
                  >
                    {property.operacion}
                  </span>
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
                    {property.tipo}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                      {property.titulo}
                    </h1>
                    <p className="mt-2 text-slate-500">{property.ubicacion}</p>
                  </div>
                  <p className="text-2xl font-bold text-primary-600 sm:text-3xl">
                    {formatPrice(property.precio, property.moneda)}
                  </p>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <DetailItem label="Superficie" value={`${property.metros} m²`} />
                  {property.tipo !== 'Terreno' && (
                    <>
                      <DetailItem label="Ambientes" value={property.ambientes} />
                      <DetailItem
                        label="Dormitorios"
                        value={
                          property.dormitorios > 0 ? property.dormitorios : '—'
                        }
                      />
                      <DetailItem
                        label="Baños"
                        value={`${property.banos} baño${property.banos !== 1 ? 's' : ''}`}
                      />
                    </>
                  )}
                </div>

                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-slate-800">
                    Descripción
                  </h2>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    {property.descripcion}
                  </p>
                </div>

                {property.caracteristicas?.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-lg font-semibold text-slate-800">
                      Características
                    </h2>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {property.caracteristicas.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-slate-600"
                        >
                          <span className="text-primary-600">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-10 flex flex-wrap gap-4 border-t border-slate-100 pt-8">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                  >
                    Consultar por WhatsApp
                  </a>
                  <SectionLink
                    section="contacto"
                    className="rounded-lg border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Ver datos de contacto
                  </SectionLink>
                </div>
              </div>
            </div>
          </article>
        )}
      </div>
    </Layout>
  )
}
