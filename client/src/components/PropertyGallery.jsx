import { useCallback, useEffect, useState } from 'react'

function ChevronIcon({ direction }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden
    >
      {direction === 'left' ? (
        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

export default function PropertyGallery({ images, title, children }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const imageKey = images.join('|')

  useEffect(() => {
    setActiveIndex(0)
  }, [imageKey])

  const goTo = useCallback(
    (index) => {
      if (images.length === 0) return
      setActiveIndex((index + images.length) % images.length)
    },
    [images.length],
  )

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  useEffect(() => {
    if (images.length <= 1) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [images.length, goPrev, goNext])

  if (images.length === 0) {
    return (
      <div className="relative aspect-[16/7] overflow-hidden bg-slate-100 sm:aspect-[21/9]">
        {children}
      </div>
    )
  }

  const hasMultiple = images.length > 1

  return (
    <>
      <div className="relative aspect-[16/7] overflow-hidden bg-slate-900 sm:aspect-[21/9]">
        {images.map((url, index) => (
          <img
            key={`${url}-${index}`}
            src={url}
            alt={`${title} ${index + 1}`}
            draggable={false}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {children}

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-90 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-black/65 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4 sm:h-11 sm:w-11"
            >
              <ChevronIcon direction="left" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-90 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-black/65 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 sm:h-11 sm:w-11"
            >
              <ChevronIcon direction="right" />
            </button>

            <span className="absolute bottom-4 right-4 z-20 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition-opacity duration-300">
              {activeIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto border-t border-slate-100 bg-slate-50 p-3">
          {images.map((url, index) => (
            <button
              key={`thumb-${url}-${index}`}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Ver imagen ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              className={`shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 ease-out ${
                index === activeIndex
                  ? 'scale-105 border-primary-600 opacity-100 shadow-md'
                  : 'border-transparent opacity-70 hover:scale-105 hover:opacity-100'
              }`}
            >
              <img
                src={url}
                alt=""
                className="h-16 w-24 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </>
  )
}
