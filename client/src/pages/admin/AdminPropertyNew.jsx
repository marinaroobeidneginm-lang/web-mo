import { useNavigate } from 'react-router-dom'
import PropertyForm from '../../components/admin/PropertyForm'
import { EMPTY_PROPERTY_FORM } from '../../constants/propertyOptions'
import { createProperty } from '../../services/propertyApi'

export default function AdminPropertyNew() {
  const navigate = useNavigate()

  const handleSubmit = async (payload) => {
    const property = await createProperty(payload)
    navigate('/admin', {
      state: { message: `Propiedad "${property.titulo}" creada correctamente.` },
    })
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Nueva propiedad</h2>
        <p className="mt-1 text-sm text-slate-500">
          Completá los datos para publicar un inmueble en el sitio.
        </p>
      </div>

      <PropertyForm
        initialForm={EMPTY_PROPERTY_FORM}
        submitLabel="Crear propiedad"
        onSubmit={handleSubmit}
      />
    </div>
  )
}
