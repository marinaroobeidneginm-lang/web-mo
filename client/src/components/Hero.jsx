import ginoPhoto from '../assets/gino_fondobiblioteca.png'

export default function Hero({ nombre }) {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent-400" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-26 sm:px-6 sm:py-24 lg:py-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary-100">
              Tu hogar, nuestra prioridad
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Encontrá la propiedad ideal con {nombre}
            </h1>
            <p className="mt-5 text-lg text-primary-100">
              Venta y alquiler de departamentos, casas y locales comerciales en
              el NOA. Asesoramiento personalizado y trato de confianza.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#propiedades"
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50"
              >
                Ver propiedades
              </a>
              <a
                href="#contacto"
                className="rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Contactanos
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end">
            <img
              src={ginoPhoto}
              alt="Gino Marinaro Obeid- Martillero Público y Corredor Inmobiliario"
              className="max-h-[420px] w-auto max-w-full object-contain object-bottom"
            />
            <div className="mt-4 text-center lg:text-right">
              <p className="text-lg font-semibold">Gino Marinaro Obeid</p>
              <p className="mt-1 text-sm text-primary-100">
                Martillero Público y Corredor Inmobiliario - M.P. 674
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
