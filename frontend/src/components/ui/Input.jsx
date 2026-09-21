export function Input({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  error = false,
  className = '',
  ...props
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full px-3.5 py-2.5 text-sm bg-white text-[#231815] border rounded-sm transition-colors duration-150 placeholder:text-[#82756E]/60 focus:bg-white disabled:bg-[#F3EFEA] disabled:text-[#82756E] disabled:cursor-not-allowed ${
        error
          ? 'border-[#DC2626] focus-visible:outline-[#DC2626]'
          : 'border-[#D5CDC7] hover:border-[#513229] focus-visible:outline-[#A5BCD6]'
      } ${className}`}
      {...props}
    />
  );
}

export function Textarea({
  id,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled = false,
  required = false,
  error = false,
  className = '',
  ...props
}) {
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full px-3.5 py-2.5 text-sm bg-white text-[#231815] border rounded-sm transition-colors duration-150 placeholder:text-[#82756E]/60 focus:bg-white disabled:bg-[#F3EFEA] disabled:text-[#82756E] disabled:cursor-not-allowed resize-y ${
        error
          ? 'border-[#DC2626] focus-visible:outline-[#DC2626]'
          : 'border-[#D5CDC7] hover:border-[#513229] focus-visible:outline-[#A5BCD6]'
      } ${className}`}
      {...props}
    />
  );
}

export function Select({
  id,
  name,
  value,
  onChange,
  disabled = false,
  required = false,
  error = false,
  children,
  className = '',
  ...props
}) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full px-3.5 py-2.5 text-sm bg-white text-[#231815] border rounded-sm transition-colors duration-150 disabled:bg-[#F3EFEA] disabled:text-[#82756E] disabled:cursor-not-allowed ${
        error
          ? 'border-[#DC2626] focus-visible:outline-[#DC2626]'
          : 'border-[#D5CDC7] hover:border-[#513229] focus-visible:outline-[#A5BCD6]'
      } ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
