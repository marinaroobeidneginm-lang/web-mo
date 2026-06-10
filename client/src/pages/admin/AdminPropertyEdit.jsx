import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PropertyForm from '../../components/admin/PropertyForm'
import { fetchProperty, updateProperty } from '../../services/propertyApi'
import { propertyToForm } from '../../utils/propertyForm'

export default function AdminPropertyEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [initialForm, setInitialForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const property = await fetchProperty(id)
        setInitialForm(propertyToForm(property))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  const handleSubmit = async (payload) => {
    const property = await updateProperty(id, payload)
    navigate('/admin', {
      state: {
        message: `Propiedad "${property.titulo}" actualizada correctamente.`,
      },
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
        <p className="font-medium text-red-800">{error}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Editar propiedad</h2>
        <p className="mt-1 text-sm text-slate-500">ID {id}</p>
      </div>

      <PropertyForm
        key={id}
        initialForm={initialForm}
        submitLabel="Guardar cambios"
        onSubmit={handleSubmit}
      />
    </div>
  )
}
