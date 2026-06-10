import Layout from '../components/Layout'
import Hero from '../components/Hero'
import PropertiesSection from '../components/PropertiesSection'
import ContactSection from '../components/ContactSection'
import { useContact } from '../hooks/useContact'

export default function Home() {
  const { contact, loading: loadingContact, error: errorContact } = useContact()

  const nombre = contact?.nombre ?? 'Marinaro Obeid Inmobiliaria'

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
