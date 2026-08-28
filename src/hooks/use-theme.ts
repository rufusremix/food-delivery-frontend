import { useEffect, useState } from 'react'

import {
  applyTheme,
  applyThemeClass,
  getInitialTheme,
  hasExplicitTheme,
  type Theme
} from '@/lib/theme'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    applyTheme(nextTheme)
    setTheme(nextTheme)
  }

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (event: MediaQueryListEvent) => {
      if (hasExplicitTheme()) return

      const nextTheme: Theme = event.matches ? 'dark' : 'light'
      applyThemeClass(nextTheme)
      setTheme(nextTheme)
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  return { theme, toggleTheme }
}
