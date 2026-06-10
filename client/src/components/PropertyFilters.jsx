const OPERACIONES = ['Todos', 'Venta', 'Alquiler']

const TIPOS = [
  'Todos',
  'Departamento',
  'Casa',
  'PH',
  'Terreno',
  'Comercial',
]

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = value === option

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function PropertyFilters({
  operacion,
  tipo,
  onOperacionChange,
  onTipoChange,
  resultCount,
  rangeStart,
  rangeEnd,
}) {
  return (
    <div className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-5 sm:grid-cols-2">
        <FilterGroup
          label="Operación"
          options={OPERACIONES}
          value={operacion}
          onChange={onOperacionChange}
        />
        <FilterGroup
          label="Tipo de propiedad"
          options={TIPOS}
          value={tipo}
          onChange={onTipoChange}
        />
      </div>
      <p className="mt-4 text-sm text-slate-500">
        {resultCount === 0
          ? 'No hay propiedades con los filtros seleccionados'
          : rangeStart && rangeEnd
            ? `Mostrando ${rangeStart}-${rangeEnd} de ${resultCount} propiedad${resultCount !== 1 ? 'es' : ''}`
            : `${resultCount} propiedad${resultCount !== 1 ? 'es' : ''} encontrada${resultCount !== 1 ? 's' : ''}`}
      </p>
    </div>
  )
}
