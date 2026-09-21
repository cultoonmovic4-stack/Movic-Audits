import Button from './Button';

export function LoadingState({
  message = 'Loading content...',
  fullScreen = false,
  className = '',
}) {
  const containerClass = fullScreen
    ? 'fixed inset-0 bg-[#FAF8F6]/90 z-50 flex flex-col items-center justify-center'
    : `py-16 flex flex-col items-center justify-center ${className}`;

  return (
    <div className={containerClass} role="status" aria-live="polite">
      <div className="w-10 h-10 border-3 border-[#E8E3DF] border-t-[#513229] rounded-full animate-spin mb-4" />
      <p className="text-sm font-medium text-[#584C46] tracking-tight">{message}</p>
    </div>
  );
}

export function EmptyState({
  title = 'No items found',
  description = 'There are currently no records or entries to display.',
  actionText,
  onAction,
  className = '',
}) {
  return (
    <div
      className={`py-16 px-6 text-center border border-dashed border-[#D5CDC7] rounded-sm bg-[#FAF8F6] ${className}`}
    >
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#F3EFEA] flex items-center justify-center text-[#513229]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
          />
        </svg>
      </div>
      <h3 className="text-base font-bold text-[#231815] mb-1.5">{title}</h3>
      <p className="text-sm text-[#82756E] max-w-md mx-auto mb-6">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while loading this section.',
  onRetry,
  className = '',
}) {
  return (
    <div
      className={`py-12 px-6 text-center border border-[#DC2626]/20 bg-[#DC2626]/5 rounded-sm ${className}`}
      role="alert"
    >
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#DC2626]/10 flex items-center justify-center text-[#DC2626]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      </div>
      <h3 className="text-base font-bold text-[#231815] mb-1.5">{title}</h3>
      <p className="text-sm text-[#584C46] max-w-md mx-auto mb-6">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
