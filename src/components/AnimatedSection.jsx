import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/**
 * Wrapper component for scroll-triggered animations
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {string} props.animation - Animation class to apply
 * @param {number} props.delay - Animation delay in ms
 * @param {Object} props.observerOptions - Intersection observer options
 * @param {string} props.className - Additional CSS classes
 */
function AnimatedSection({ 
  children, 
  animation = 'animate-slide-in-up',
  delay = 0,
  observerOptions = {},
  className = '',
  ...props 
}) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
    ...observerOptions
  });

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isIntersecting ? `revealed ${animation}` : ''} ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        transitionDelay: `${delay}ms`
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default AnimatedSection;