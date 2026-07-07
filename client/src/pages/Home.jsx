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

  const nombre = contact?.nombre ?? 'Marinaro Obeid Inmobiliaria'

  useEffect(() => {
    const sectionId = location.state?.scrollTo || location.hash?.slice(1)
    if (!sectionId) return undefined

    return scrollToSectionWhenReady(sectionId, {
      duration: 5000,
      interval: 100,
    })
  }, [location.state?.scrollTo, location.hash])

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
