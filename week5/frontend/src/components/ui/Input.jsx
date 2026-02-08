const Input = ({
  label,
  id,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  required = false,
  className = '',
  disabled = false,
  ...props
}) => {
  const baseClass =
    'w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white text-white'

  const inputComponent = (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={`${baseClass} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      style={{ 
        backgroundColor: 'var(--card)', 
        borderColor: 'var(--border)', 
        color: 'var(--foreground)',
        '--tw-ring-color': 'var(--ring)'
      }}
      {...props}
    />
  )

  // 如果没有 label，直接返回 input（用于搜索框等）
  if (!label) {
    return inputComponent
  }

  // 有 label 时返回带 label 的包装
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-sm font-medium text-secondary-700 dark:text-secondary-300"
      >
        {label}
      </label>
      {inputComponent}
    </div>
  )
}

export default Input
