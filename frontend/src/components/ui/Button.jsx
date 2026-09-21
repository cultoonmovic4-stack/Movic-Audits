export function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  isLoading = false,
  fullWidth = false,
  className = '',
  onClick,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-colors duration-150 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2';

  const variants = {
    primary:
      'bg-[#513229] text-[#FAF8F6] hover:bg-[#3E251E] active:bg-[#2F1B16] focus-visible:outline-[#A5BCD6]',
    secondary:
      'bg-[#F3EFEA] text-[#231815] border border-[#E8E3DF] hover:bg-[#E8E3DF] active:bg-[#D5CDC7] focus-visible:outline-[#513229]',
    outline:
      'bg-transparent text-[#513229] border border-[#513229] hover:bg-[#513229]/5 active:bg-[#513229]/10 focus-visible:outline-[#A5BCD6]',
    accent:
      'bg-[#A5BCD6] text-[#231815] hover:bg-[#88A3C2] active:bg-[#6D8DAF] focus-visible:outline-[#513229]',
    ghost:
      'bg-transparent text-[#584C46] hover:text-[#231815] hover:bg-[#F3EFEA] active:bg-[#E8E3DF] focus-visible:outline-[#513229]',
    danger:
      'bg-[#DC2626] text-white hover:bg-[#B91C1C] active:bg-[#991B1B] focus-visible:outline-[#DC2626]',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

export default Button;
