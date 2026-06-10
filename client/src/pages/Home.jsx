import Layout from '../components/Layout'
import Hero from '../components/Hero'
import PropertiesSection from '../components/PropertiesSection'
import ContactSection from '../components/ContactSection'
import { useProperties } from '../hooks/useProperties'
import { useContact } from '../hooks/useContact'

export default function Home() {
  const { properties, loading: loadingProperties, error: errorProperties } =
    useProperties()
  const { contact, loading: loadingContact, error: errorContact } = useContact()

  const nombre = contact?.nombre ?? 'Marinaro Obeid Inmobiliaria'

  return (
    <Layout>
      <Hero nombre={nombre} />
      <PropertiesSection
        properties={properties}
        loading={loadingProperties}
        error={errorProperties}
      />
      <ContactSection
        contact={contact}
        loading={loadingContact}
        error={errorContact}
      />
    </Layout>
  )
}
