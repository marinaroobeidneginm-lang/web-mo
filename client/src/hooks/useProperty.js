import { useEffect, useState } from 'react'

export function useProperty(id) {
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchProperty = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/properties/${id}`)
        if (!response.ok) throw new Error('Propiedad no encontrada')
        const data = await response.json()
        setProperty(data)
      } catch (err) {
        setProperty(null)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [id])

  return { property, loading, error }
}
