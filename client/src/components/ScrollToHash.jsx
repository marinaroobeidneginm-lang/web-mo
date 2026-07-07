import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSectionWhenReady } from '../utils/scrollToSection'

export default function ScrollToHash() {
  const location = useLocation()
  const { pathname, hash, state } = location

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (pathname !== '/') return undefined

    const sectionId = state?.scrollTo || (hash ? hash.slice(1) : null)
    if (!sectionId) return undefined

    return scrollToSectionWhenReady(sectionId, {
      duration: 5000,
      interval: 100,
    })
  }, [pathname, hash, state?.scrollTo])

  return null
}
