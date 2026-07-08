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

