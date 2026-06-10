import Header from './Header'
import Footer from './Footer'
import { useContact } from '../hooks/useContact'

export default function Layout({ children }) {
  const { contact } = useContact()
  const nombre = contact?.nombre ?? 'Marinaro Obeid Inmobiliaria'

  return (
    <div className="min-h-screen bg-white">
      <Header nombre={nombre} />
      <main>{children}</main>
      <Footer nombre={nombre} />
    </div>
  )
}
