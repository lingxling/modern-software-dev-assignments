import { useState, useEffect } from 'react'

export function useDarkMode() {
  const getInitialMode = () => {
    return localStorage.getItem('darkMode') === 'true' || 
      window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const [darkMode, setDarkMode] = useState(getInitialMode)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', newMode)
  }

  return {
    darkMode,
    toggleDarkMode,
  }
}
