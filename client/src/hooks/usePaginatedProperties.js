import { useEffect, useState } from 'react'
import { PROPERTIES_PAGE_SIZE } from '../constants/pagination'
import { fetchPaginatedProperties } from '../services/propertyApi'

export function usePaginatedProperties({ page, operacion, tipo }) {
  const [properties, setProperties] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PROPERTIES_PAGE_SIZE,
    total: 0,
    totalPages: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)

      try {
        const result = await fetchPaginatedProperties({
          page,
          limit: PROPERTIES_PAGE_SIZE,
          tipo,
          operacion,
        })
        setProperties(result.data)
        setPagination(result.pagination)
      } catch (err) {
        setError(err.message)
        setProperties([])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [page, operacion, tipo])

  return { properties, pagination, loading, error }
}
