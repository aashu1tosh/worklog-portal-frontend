import { createContext, useEffect, useState } from 'react'

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeContext = createContext<{
  theme: string
  toggleTheme: (theme: 'light' | 'dark') => void
}>({
  theme: 'light',
  toggleTheme: () => { },
})

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    if (savedTheme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [])

  const toggleTheme = (theme: 'light' | 'dark') => {
    setTheme(theme)
    if (theme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
