import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (pathname !== '/' || !hash) return

    const sectionId = hash.slice(1)
    const timer = window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }, 0)

    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return null
}
