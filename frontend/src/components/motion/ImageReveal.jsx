import useScrollReveal from '../../hooks/useScrollReveal';

/**
 * ImageReveal Component
 * Editorial camera entrance effect: overflow-hidden container with subtle image
 * scale relaxation (1.06 -> 1.0) and opacity reveal.
 *
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Accessible alternative text
 * @param {string} [props.className=''] - Container classes
 * @param {string} [props.imageClassName=''] - Image element classes
 * @param {number} [props.delay=0] - Delay before animation starts (ms)
 * @param {number} [props.duration=1100] - Duration of animation (ms)
 * @param {'lazy'|'eager'} [props.loading='lazy']
 * @param {React.ReactNode} [props.children] - Optional overlays/elements
 */
export function ImageReveal({
  src,
  alt,
  className = '',
  imageClassName = '',
  delay = 0,
  duration = 1100,
  loading = 'lazy',
  children,
  ...restProps
}) {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.15 });

  const activeImageClass = isRevealed
    ? 'image-reveal-img-active'
    : 'image-reveal-img-init';

  return (
    <div
      ref={ref}
      data-motion="image-reveal"
      className={`image-reveal-container relative ${className}`.trim()}
      {...restProps}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={`image-reveal-img w-full h-full object-cover ${activeImageClass} ${imageClassName}`.trim()}
        style={{
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`,
        }}
      />
      {children}
    </div>
  );
}

export default ImageReveal;
