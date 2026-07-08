import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '../utils/scrollToSection'

export default function SectionLink({ section, children, className }) {
  const location = useLocation()
  const navigate = useNavigate()
  const hash = `#${section}`

  const handleClick = (event) => {
    event.preventDefault()

    if (location.pathname === '/') {
      window.history.replaceState(null, '', hash)
      scrollToSection(section, { behavior: 'auto' })
      return
    }

    // Dejá el scroll programado para que Home lo ejecute luego del render.
    navigate({ pathname: '/', hash, state: { scrollTo: section } })
  }

  return (
    <a href={`/${hash}`} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
