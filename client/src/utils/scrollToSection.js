export function scrollToSection(
  sectionId,
  { behavior = 'smooth', headerOffset = 72 } = {},
) {
  const element = document.getElementById(sectionId)
  if (!element) return false

  const top =
    element.getBoundingClientRect().top + window.scrollY - headerOffset

  window.scrollTo({ top: Math.max(0, top), behavior })
  return true
}

export function scrollToSectionWhenReady(
  sectionId,
  { duration = 5000, interval = 100, ...scrollOptions } = {},
) {
  const start = Date.now()
  let timerId = null
  let observer = null

  const tryScroll = () => {
    scrollToSection(sectionId, { behavior: 'auto', ...scrollOptions })
  }

  tryScroll()

  timerId = window.setInterval(() => {
    tryScroll()
    if (Date.now() - start >= duration) {
      window.clearInterval(timerId)
      timerId = null
      observer?.disconnect()
    }
  }, interval)

  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(tryScroll)
    observer.observe(document.documentElement)
  }

  return () => {
    if (timerId !== null) window.clearInterval(timerId)
    observer?.disconnect()
  }
}
