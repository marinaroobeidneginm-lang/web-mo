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

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary-100">
          Tu hogar, nuestra prioridad
        </p>
        <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
          Encontrá la propiedad ideal con {nombre}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-primary-100">
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
    </section>
  )
}
