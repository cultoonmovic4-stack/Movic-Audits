export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
  breadcrumbs,
  className = '',
}) {
  return (
    <header className={`mb-8 sm:mb-12 ${className}`}>
      {breadcrumbs && <div className="mb-4 text-xs text-[#82756E]">{breadcrumbs}</div>}
      {eyebrow && (
        <span className="inline-block text-xs font-bold tracking-wider uppercase text-[#513229] mb-2">
          {eyebrow}
        </span>
      )}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#231815] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 sm:mt-3 text-base sm:text-lg text-[#584C46] max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
      </div>
      <div className="mt-6 border-b border-[#E8E3DF]" />
    </header>
  );
}

export default PageHeader;
