import React, { useState, useEffect } from 'react';

function PageTransition({ 
  children, 
  isLoading = false,
  transition = 'fade',
  duration = 300,
  className = ''
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentChildren, setCurrentChildren] = useState(children);

  const transitions = {
    fade: {
      enter: 'animate-fade-in',
      exit: 'animate-fade-out'
    },
    slideUp: {
      enter: 'animate-slide-in-up',
      exit: 'animate-slide-out-down'
    },
    slideDown: {
      enter: 'animate-slide-in-down',
      exit: 'animate-slide-out-up'
    },
    slideLeft: {
      enter: 'animate-slide-in-left',
      exit: 'animate-slide-out-right'
    },
    slideRight: {
      enter: 'animate-slide-in-right',
      exit: 'animate-slide-out-left'
    },
    scale: {
      enter: 'animate-scale-in',
      exit: 'animate-scale-out'
    }
  };

  useEffect(() => {
    if (isLoading) {
      setIsVisible(false);
    } else {
      const timer = setTimeout(() => {
        setCurrentChildren(children);
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [children, isLoading]);

  const transitionClasses = transitions[transition] || transitions.fade;

  return (
    <div 
      className={`transition-container ${className}`}
      style={{ 
        '--transition-duration': `${duration}ms`
      }}
    >
      <div
        className={`
          transition-content
          ${isVisible ? transitionClasses.enter : transitionClasses.exit}
        `}
        style={{
          animationDuration: `${duration}ms`,
          animationFillMode: 'both'
        }}
      >
        {currentChildren}
      </div>
    </div>
  );
}

export default PageTransition;