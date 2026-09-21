export function Section({
  children,
  variant = 'canvas', // 'canvas' | 'white' | 'dark'
  className = '',
  ...props
}) {
  const bgStyles = {
    canvas: 'bg-[#FAF8F6] text-[#231815]',
    white: 'bg-white text-[#231815]',
    dark: 'bg-[#1C1412] text-[#FAF8F6]',
    darker: 'bg-[#231815] text-[#FAF8F6]',
  };

  return (
    <section
      className={`py-12 sm:py-16 lg:py-24 ${bgStyles[variant] || bgStyles.canvas} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

export default Section;
