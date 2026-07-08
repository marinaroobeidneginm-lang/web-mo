import Layout from '../components/Layout'

const values = [
  {
    title: 'Acompañamiento real',
    description:
      'Estamos presentes en cada etapa de la operación, desde la primera consulta hasta el cierre final.',
  },
  {
    title: 'Honestidad y transparencia',
    description:
      'Trabajamos con información clara, expectativas realistas y un trato directo en cada negociación.',
  },
  {
    title: 'Conocimiento local',
    description:
      'Somos una empresa radicada en Tucumán pero con raíces salteñas. Conocemos el mercado, las zonas y las oportunidades de la región.',
  },
]

export default function About() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-primary-700 to-primary-500">
        
        <section className="pt-0 pb-6 sm:pt-10 sm:pb-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="bg-transparent p-8 sm:p-12">
              <h1 className="text-2xl font-bold uppercase tracking-[0.2em] text-primary-500">
                Nosotros
              </h1>
              <p className="mt-6 text-base leading-8 text-white sm:text-lg">
                Somos una empresa radicada en Tucuman con operaciones en Salta y dedicada 
                a acompañarte durante todo el proceso de compra, venta o alquiler de tu proxima propiedad.
                Nuestro trabajo se basa en la honestidad, la integridad y la etica
                en los negocios, entendiendo que cada operacion inmobiliaria implica
                decisiones importantes para vos y tu familia.
              </p>
              <p className="mt-4 text-base leading-8 text-white sm:text-lg">
                En Marinaro Obeid Negocios Inmobiliarios creemos en un trato humano,
                profesional y personalizado. Escuchamos lo que necesitas, analizamos
                cada caso con seriedad y buscamos opciones que realmente se adapten
                a tus objetivos, ya sea invertir, mudarte, vender con tranquilidad o
                encontrar ese hogar que imaginas.
              </p>
            </div>
          </div>
        </section>
      
        <section className="py-2 sm:py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-6 md:grid-cols-3">
              {values.map((value) => (
                <article
                  key={value.title}
                  className="rounded-2xl border border-yellow-200 bg-transparent p-6 shadow-sm text-white transition hover:scale-[1.02] hover:shadow-md"
                >
                  <h2 className="text-xl font-semibold text-slate-100">
                    {value.title}
                  </h2>
                  <p className="mt-3 leading-7 text-slate-50">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pt-2 pb-8 sm:pt-10 sm:pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="bg-transparent p-8 sm:p-12">
              <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
                Nuestra manera de trabajar
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold text-slate-200">
                    Asesoramiento integral
                  </h3>
                  <p className="mt-3 leading-7 text-slate-300">
                    Te guiamos en la valuacion, la comercializacion, la busqueda y
                    la negociacion de tu propiedad, con una mirada profesional y
                    responsable.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">
                    Relaciones de largo plazo
                  </h3>
                  <p className="mt-3 leading-7 text-slate-200">
                    Nos interesa construir confianza duradera con cada cliente,
                    porque entendemos que una buena experiencia hoy tambien abre la
                    puerta a futuras oportunidades.
                  </p>
                </div>
              </div>
              <p className="mt-8 leading-8 text-slate-200">
                Nuestro compromiso es que te sientas acompanado, informado y seguro
                en cada paso. Mas que intermediar operaciones, buscamos ayudarte a
                tomar buenas decisiones inmobiliarias.
              </p>
            </div>
          </div>
        </section>
        
      </div>
    </Layout>
  )
}