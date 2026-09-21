import useScrollReveal from '../../hooks/useScrollReveal';

/**
 * Reveal Component
 * Editorial scroll reveal wrapper supporting cinematic variants and delays.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'fade-up'|'fade-in'|'fade-left'|'fade-right'|'scale-in'|'line'} [props.variant='fade-up']
 * @param {number} [props.delay=0] - Milliseconds to delay transition
 * @param {number} [props.duration=800] - Duration in milliseconds
 * @param {string} [props.className='']
 * @param {keyof JSX.IntrinsicElements} [props.as='div']
 * @param {boolean} [props.immediate=false] - Reveal immediately on mount (for hero elements)
 * @param {number} [props.threshold=0.1]
 * @param {string} [props.rootMargin='0px 0px -8% 0px']
 */
export function Reveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 800,
  className = '',
  as: Component = 'div',
  immediate = false,
  threshold = 0.1,
  rootMargin = '0px 0px -8% 0px',
  ...restProps
}) {
  const { ref, isRevealed } = useScrollReveal({ threshold, rootMargin, immediate });

  const activeClass = isRevealed
    ? `reveal-active-${variant}`
    : `reveal-init-${variant}`;

  const style = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    ...restProps.style,
  };

  return (
    <Component
      ref={ref}
      data-motion="reveal"
      className={`reveal-base ${activeClass} ${className}`.trim()}
      style={style}
      {...restProps}
    >
      {children}
    </Component>
  );
}

export default Reveal;
