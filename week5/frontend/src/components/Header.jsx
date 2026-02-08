import React from 'react'
import Button from './ui/Button'

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="mb-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div className="text-center sm:text-left flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 dark:text-white">Modern Software Dev Starter</h1>
        </div>
        <Button
          onClick={toggleDarkMode}
          variant="ghost"
          className="p-3 rounded-full ripple-effect"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </Button>
      </div>
    </header>
  )
}

export default Header
