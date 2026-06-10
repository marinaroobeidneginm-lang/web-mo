import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice'

export default function PropertyCard({ property }) {
  const isVenta = property.operacion === 'Venta'

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link to={`/propiedades/${property.id}`} className="block no-underline">
        <div className="relative aspect-[3/2] overflow-hidden">
          <img
            src={property.imagen}
            alt={property.titulo}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
              isVenta
                ? 'bg-primary-600 text-white'
                : 'bg-accent-500 text-white'
            }`}
          >
            {property.operacion}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
            {property.tipo}
          </span>
        </div>

        <div className="p-5">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold text-slate-800">
              {property.titulo}
            </h3>
            <p className="shrink-0 text-lg font-bold text-primary-600">
              {formatPrice(property.precio, property.moneda)}
            </p>
          </div>

          <p className="mb-3 text-sm text-slate-500">{property.ubicacion}</p>
          <p className="mb-4 line-clamp-2 text-sm text-slate-600">
            {property.descripcion}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
            <div className="flex flex-wrap gap-3">
              <span>{property.metros} m²</span>
              {property.tipo !== 'Terreno' && (
                <>
                  <span>{property.ambientes} amb.</span>
                  {property.dormitorios > 0 && (
                    <span>{property.dormitorios} dorm.</span>
                  )}
                  <span>
                    {property.banos} baño{property.banos !== 1 ? 's' : ''}
                  </span>
                </>
              )}
            </div>
            <span className="font-medium text-primary-600 group-hover:underline">
              Ver ficha →
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
