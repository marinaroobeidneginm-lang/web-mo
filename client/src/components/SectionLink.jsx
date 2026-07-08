import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '../utils/scrollToSection'

export default function SectionLink({ section, children, className }) {
  const location = useLocation()
  const navigate = useNavigate()
  const hash = `#${section}`

  const handleClick = (event) => {
    event.preventDefault()

    if (location.pathname === '/') {
<<<<<<< HEAD
      scrollToSection(section)
=======
>>>>>>> dev
      window.history.replaceState(null, '', hash)
      scrollToSection(section, { behavior: 'auto' })
      return
    }

<<<<<<< HEAD
    navigate({ pathname: '/', hash }, { state: { scrollTo: section } })
=======
    // Dejá el scroll programado para que Home lo ejecute luego del render.
    navigate({ pathname: '/', hash, state: { scrollTo: section } })
>>>>>>> dev
  }

  return (
    <a href={`/${hash}`} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
