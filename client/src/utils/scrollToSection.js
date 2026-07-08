function getHeaderOffset() {
  // Matches the sticky header height in the UI (approx).
  return 72
}

export function scrollToSection(sectionId, { behavior = 'auto' } = {}) {
  const element = document.getElementById(sectionId)
  if (!element) return false

  const headerOffset = getHeaderOffset()
  const top =
    element.getBoundingClientRect().top + window.scrollY - headerOffset

  window.scrollTo({ top: Math.max(0, top), behavior })
  return true
}

export function scrollToSectionWhenReady(
  sectionId,
<<<<<<< HEAD
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
=======
  { maxAttempts = 40, interval = 70, behavior = 'auto' } = {},
) {
  if (!sectionId) return () => {}

  let attempts = 0
  let timerId = null

  const tryScroll = () => {
    attempts += 1
    const element = document.getElementById(sectionId)
    if (!element) return false

    const ok = scrollToSection(sectionId, { behavior })
    if (!ok) return false

    // Consider it successful if the section is near the top of the viewport.
    const rectTop = element.getBoundingClientRect().top
    return rectTop < 220 && rectTop > -80
  }

  // Fire once immediately.
  if (tryScroll()) return () => {}

  timerId = window.setInterval(() => {
    if (tryScroll() || attempts >= maxAttempts) {
      if (timerId) window.clearInterval(timerId)
      timerId = null
    }
  }, interval)

  return () => {
    if (timerId) window.clearInterval(timerId)
  }
}

>>>>>>> dev
