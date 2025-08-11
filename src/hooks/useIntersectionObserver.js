import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for intersection observer with scroll-triggered animations
 * @param {Object} options - Intersection observer options
 * @param {number} options.threshold - Threshold for triggering (0-1)
 * @param {string} options.rootMargin - Root margin for early/late triggering
 * @param {boolean} options.triggerOnce - Whether to trigger only once
 * @returns {Array} [ref, isIntersecting, entry]
 */
export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true
} = {}) {
  const elementRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);
        
        // If triggerOnce is true, stop observing after first intersection
        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [elementRef, isIntersecting, entry];
}

/**
 * Hook for multiple elements with staggered animations
 * @param {number} count - Number of elements to observe
 * @param {Object} options - Intersection observer options
 * @param {number} staggerDelay - Delay between animations in ms
 * @returns {Array} Array of [ref, isVisible] pairs
 */
export function useStaggeredIntersection(count, options = {}, staggerDelay = 100) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const newElements = Array.from({ length: count }, () => ({
      ref: useRef(null),
      isVisible: false,
      observer: null,
    }));
    setElements(newElements);
  }, [count]);

  useEffect(() => {
    if (elements.length === 0) return;

    const observers = elements.map((element, index) => {
      if (!element.ref.current) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setElements(prev => 
                prev.map((el, i) => 
                  i === index ? { ...el, isVisible: true } : el
                )
              );
            }, index * staggerDelay);
            
            if (options.triggerOnce !== false) {
              observer.unobserve(element.ref.current);
            }
          }
        },
        {
          threshold: options.threshold || 0.1,
          rootMargin: options.rootMargin || '0px 0px -50px 0px',
        }
      );

      observer.observe(element.ref.current);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [elements, staggerDelay, options]);

  return elements.map(el => [el.ref, el.isVisible]);
}

/**
 * Hook for parallax scroll effects
 * @param {number} speed - Parallax speed multiplier (0-1)
 * @returns {Array} [ref, transform]
 */
export function useParallax(speed = 0.5) {
  const elementRef = useRef(null);
  const [transform, setTransform] = useState('translateY(0px)');

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;

      // Only apply parallax when element is in viewport
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        setTransform(`translateY(${rate}px)`);
      }
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [speed]);

  return [elementRef, transform];
}