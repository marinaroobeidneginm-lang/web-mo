import { useEffect, useState } from 'react'

export function useProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties')
        if (!response.ok) throw new Error('Error al cargar propiedades')
        const data = await response.json()
        setProperties(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  return { properties, loading, error }
}
