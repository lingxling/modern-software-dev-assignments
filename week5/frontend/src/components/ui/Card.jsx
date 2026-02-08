import React from 'react'

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white dark:bg-card rounded-xl shadow-card p-6 transition-all duration-300 hover:shadow-elevated ${className}`}>
      {children}
    </div>
  )
}

export function CardHeader({ title, badge }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-secondary-800 dark:text-white">{title}</h2>
      {badge && (
        <span className="text-sm text-secondary-500 dark:text-secondary-400 bg-secondary-50 dark:bg-secondary-800 px-3 py-1 rounded-full">
          {badge}
        </span>
      )}
    </div>
  )
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {children}
    </div>
  )
}

export function CardItem({ children, isHovered = true, className = '' }) {
  return (
    <div className={`p-4 rounded-lg border transition-all duration-300 animate-slide-in ${
      isHovered ? 'hover:shadow-md' : ''
    } ${className}`}>
      {children}
    </div>
  )
}

export function CardEmpty({ title, message, icon }) {
  return (
    <div className="text-center py-12 px-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
      {icon && (
        <div className="mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-secondary-700 dark:text-secondary-300 font-medium mb-2">{title}</h3>
      <p className="text-secondary-500 dark:text-secondary-400">{message}</p>
    </div>
  )
}

export function CardForm({ children, onSubmit, className = '' }) {
  return (
    <form onSubmit={onSubmit} className={`flex flex-col gap-3 mb-8 p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg ${className}`}>
      {children}
    </form>
  )
}

export default Card
