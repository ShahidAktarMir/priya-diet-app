import React from 'react';

function SkeletonLoader({ 
  variant = 'text',
  width = 'full',
  height = 'auto',
  className = '',
  count = 1,
  animation = 'pulse'
}) {
  const variants = {
    text: 'h-4 rounded',
    title: 'h-6 rounded',
    button: 'h-10 rounded-xl',
    card: 'h-32 rounded-2xl',
    avatar: 'w-12 h-12 rounded-full',
    image: 'h-48 rounded-xl'
  };

  const widths = {
    full: 'w-full',
    '3/4': 'w-3/4',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
    '1/4': 'w-1/4'
  };

  const animations = {
    pulse: 'animate-pulse-soft',
    shimmer: 'animate-shimmer',
    wave: 'animate-float'
  };

  const baseClasses = `
    bg-gradient-to-r from-secondary-200 via-secondary-100 to-secondary-200
    ${variants[variant]}
    ${widths[width]}
    ${animations[animation]}
    ${className}
  `;

  if (count === 1) {
    return (
      <div 
        className={baseClasses}
        style={{ height: height !== 'auto' ? height : undefined }}
      />
    );
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={baseClasses}
          style={{ 
            height: height !== 'auto' ? height : undefined,
            animationDelay: `${index * 100}ms`
          }}
        />
      ))}
    </div>
  );
}

// Preset skeleton components
export function TextSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonLoader
          key={index}
          variant="text"
          width={index === lines - 1 ? '3/4' : 'full'}
          animation="shimmer"
        />
      ))}
    </div>
  );
}

export function CardSkeleton({ className = '' }) {
  return (
    <div className={`p-6 bg-white rounded-2xl shadow-soft ${className}`}>
      <div className="flex items-center space-x-4 mb-4">
        <SkeletonLoader variant="avatar" animation="pulse" />
        <div className="flex-1 space-y-2">
          <SkeletonLoader variant="title" width="1/2" />
          <SkeletonLoader variant="text" width="3/4" />
        </div>
      </div>
      <SkeletonLoader variant="image" className="mb-4" />
      <TextSkeleton lines={2} />
    </div>
  );
}

export function FormSkeleton({ className = '' }) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkeletonLoader variant="button" />
        <SkeletonLoader variant="button" />
      </div>
      <SkeletonLoader variant="button" height="120px" />
      <div className="flex space-x-4">
        <SkeletonLoader variant="button" width="1/3" />
        <SkeletonLoader variant="button" width="2/3" />
      </div>
    </div>
  );
}

export default SkeletonLoader;