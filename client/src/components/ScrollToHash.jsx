import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSectionWhenReady } from '../utils/scrollToSection'

export default function ScrollToHash() {
  const { pathname, hash, state } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (pathname !== '/' || !hash) return
    if (state?.scrollTo) return

    const sectionId = hash.slice(1)
    return scrollToSectionWhenReady(sectionId, {
      behavior: 'auto',
      maxAttempts: 40,
      interval: 70,
    })
  }, [pathname, hash, state?.scrollTo])

  return null
}
