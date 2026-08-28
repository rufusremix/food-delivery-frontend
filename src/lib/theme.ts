export type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'theme'

export const hasExplicitTheme = (): boolean => {
  return localStorage.getItem(THEME_STORAGE_KEY) !== null
}

export const getInitialTheme = (): Theme => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export const applyThemeClass = (theme: Theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export const applyTheme = (theme: Theme) => {
  applyThemeClass(theme)
  localStorage.setItem(THEME_STORAGE_KEY, theme)
}
