import React from 'react'

const SIZE_CLASSES = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

const VARIANT_CLASSES = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white',
  secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white',
  ghost:
    'bg-transparent hover:bg-secondary-100 dark:hover:bg-secondary-800 text-secondary-800 dark:text-white',
  danger: 'bg-destructive text-destructive-foreground hover:opacity-90',
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) {
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md
  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary

  const base =
    'inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2'

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${sizeClass} ${variantClass} ${
        disabled ? 'opacity-60 cursor-not-allowed' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
