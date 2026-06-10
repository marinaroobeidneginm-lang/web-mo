import { useEffect, useState } from 'react'

export function useContact() {
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch('/api/contact')
        if (!response.ok) throw new Error('Error al cargar datos de contacto')
        const data = await response.json()
        setContact(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchContact()
  }, [])

  return { contact, loading, error }
}
