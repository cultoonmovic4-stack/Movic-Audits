export function FormField({
  id,
  label,
  error,
  helpText,
  required = false,
  children,
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-[#231815]">
          {label}
          {required && <span className="text-[#DC2626] ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {helpText && !error && (
        <p id={`${id}-help`} className="text-xs text-[#82756E]">
          {helpText}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-[#DC2626]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
