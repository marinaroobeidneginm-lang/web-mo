import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import PropertiesSection from '../components/PropertiesSection'
import ContactSection from '../components/ContactSection'
import { useContact } from '../hooks/useContact'
import { scrollToSectionWhenReady } from '../utils/scrollToSection'

export default function Home() {
  const location = useLocation()
  const { contact, loading: loadingContact, error: errorContact } = useContact()

  const nombre = contact?.nombre ?? 'Marinaro Obeid Negocios Inmobiliarios'

  useEffect(() => {
    const scrollTarget =
      location.state?.scrollTo ??
      (location.hash ? location.hash.slice(1) : null)

    if (!scrollTarget) return undefined

    return scrollToSectionWhenReady(scrollTarget, {
      behavior: 'auto',
      maxAttempts: 50,
      interval: 70,
    })
  }, [location.key])

  return (
    <Layout>
      <Hero nombre={nombre} />
      <PropertiesSection />
      <ContactSection
        contact={contact}
        loading={loadingContact}
        error={errorContact}
      />
    </Layout>
  )
}
