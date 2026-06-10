import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MONEDAS,
  OPERACIONES,
  TIPOS,
} from '../../constants/propertyOptions'
import { formToPayload } from '../../utils/propertyForm'

function Field({ label, children, hint, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  )
}

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100'

export default function PropertyForm({
  initialForm,
  submitLabel,
  onSubmit,
  cancelTo = '/admin',
}) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const esTerreno = form.tipo === 'Terreno'

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setSaving(true)

    try {
      const payload = formToPayload(form)
      await onSubmit(payload)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-slate-800">
          Información general
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Título *" className="sm:col-span-2">
            <input
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Ej: Departamento 3 ambientes en Yerba Buena"
            />
          </Field>

          <Field label="Tipo *">
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className={inputClass}
            >
              {TIPOS.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Operación *">
            <select
              name="operacion"
              value={form.operacion}
              onChange={handleChange}
              className={inputClass}
            >
              {OPERACIONES.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Ubicación *">
            <input
              name="ubicacion"
              value={form.ubicacion}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Ej: Yerba Buena, Tucumán"
            />
          </Field>

          <Field label="URL de imagen *">
            <input
              name="imagen"
              type="url"
              value={form.imagen}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="https://..."
            />
          </Field>
        </div>

        {form.imagen && (
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            <img
              src={form.imagen}
              alt="Vista previa"
              className="aspect-video w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-slate-800">
          Precio y medidas
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Precio *">
            <input
              name="precio"
              type="number"
              min="1"
              step="any"
              value={form.precio}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </Field>

          <Field label="Moneda *">
            <select
              name="moneda"
              value={form.moneda}
              onChange={handleChange}
              className={inputClass}
            >
              {MONEDAS.map((moneda) => (
                <option key={moneda} value={moneda}>
                  {moneda}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Metros² *">
            <input
              name="metros"
              type="number"
              min="1"
              step="any"
              value={form.metros}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </Field>

          {!esTerreno && (
            <>
              <Field label="Ambientes">
                <input
                  name="ambientes"
                  type="number"
                  min="0"
                  value={form.ambientes}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>

              <Field label="Dormitorios">
                <input
                  name="dormitorios"
                  type="number"
                  min="0"
                  value={form.dormitorios}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>

              <Field label="Baños">
                <input
                  name="banos"
                  type="number"
                  min="0"
                  value={form.banos}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>
            </>
          )}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-slate-800">Detalles</h2>
        <div className="grid gap-5">
          <Field label="Descripción *">
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              required
              rows={5}
              className={inputClass}
              placeholder="Describí la propiedad..."
            />
          </Field>

          <Field
            label="Características"
            hint="Una característica por línea"
          >
            <textarea
              name="caracteristicas"
              value={form.caracteristicas}
              onChange={handleChange}
              rows={5}
              className={inputClass}
              placeholder={'Balcón\nCochera\nAmenities'}
            />
          </Field>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
        >
          {saving ? 'Guardando...' : submitLabel}
        </button>
        <Link
          to={cancelTo}
          className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Cancelar
        </Link>
      </div>
    </form>
  )
}
