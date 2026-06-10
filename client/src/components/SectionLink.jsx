import { useLocation, useNavigate } from 'react-router-dom'

export default function SectionLink({ section, children, className }) {
  const location = useLocation()
  const navigate = useNavigate()
  const hash = `#${section}`

  const handleClick = (event) => {
    event.preventDefault()

    if (location.pathname === '/') {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
      window.history.replaceState(null, '', hash)
      return
    }

    navigate('/' + hash)
  }

  return (
    <a href={'/' + hash} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
