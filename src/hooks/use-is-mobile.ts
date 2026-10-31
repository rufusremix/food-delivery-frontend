import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 768

/**
 * Tracks whether the viewport is below the `md` breakpoint (768px).
 *
 * Used to mount genuinely different UIs — not just different CSS — such as a
 * modal cart sheet on mobile vs. an in-flow cart sidebar on desktop. CSS alone
 * (`md:hidden`) cannot do this because a hidden modal still traps focus and
 * locks body scroll.
 */
const useIsMobile = () => {
  const query = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    const handleChange = () => setIsMobile(mediaQueryList.matches)

    handleChange()
    mediaQueryList.addEventListener('change', handleChange)

    return () => mediaQueryList.removeEventListener('change', handleChange)
  }, [query])

  return isMobile
}

export { useIsMobile }
