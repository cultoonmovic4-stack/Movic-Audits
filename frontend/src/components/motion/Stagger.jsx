import { Children, isValidElement, cloneElement } from 'react';

/**
 * Stagger Component
 * Automatically injects progressive stagger delays into its direct children.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.interval=100] - Milliseconds between child reveals
 * @param {number} [props.baseDelay=0] - Initial starting delay (ms)
 * @param {string} [props.className='']
 * @param {keyof JSX.IntrinsicElements} [props.as='div']
 */
export function Stagger({
  children,
  interval = 100,
  baseDelay = 0,
  className = '',
  as: Component = 'div',
  ...restProps
}) {
  let childIndex = 0;

  const staggeredChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    const currentDelay = baseDelay + childIndex * interval;
    childIndex += 1;

    return cloneElement(child, {
      delay: (child.props.delay || 0) + currentDelay,
    });
  });

  return (
    <Component className={className} {...restProps}>
      {staggeredChildren}
    </Component>
  );
}

export default Stagger;
