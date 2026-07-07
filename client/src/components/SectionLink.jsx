import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '../utils/scrollToSection'

export default function SectionLink({ section, children, className }) {
  const location = useLocation()
  const navigate = useNavigate()
  const hash = `#${section}`

  const handleClick = (event) => {
    event.preventDefault()

    if (location.pathname === '/') {
      scrollToSection(section)
      window.history.replaceState(null, '', hash)
      return
    }

    navigate({ pathname: '/', hash }, { state: { scrollTo: section } })
  }

  return (
    <a href={`/${hash}`} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
