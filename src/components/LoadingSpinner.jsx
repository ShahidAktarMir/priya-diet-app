import React from 'react';

function LoadingSpinner({ 
  size = 'md', 
  color = 'primary', 
  className = '',
  text = null 
}) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colors = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    accent: 'text-accent-600',
    white: 'text-white'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizes[size]} ${colors[color]} animate-spin`}>
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="60 40"
              className="opacity-75"
            />
          </svg>
        </div>
        
        {/* Inner dot */}
        <div className={`absolute inset-0 flex items-center justify-center`}>
          <div className={`w-2 h-2 ${colors[color]} rounded-full animate-pulse`} />
        </div>
      </div>
      
      {text && (
        <p className={`mt-3 text-sm font-medium ${colors[color]} animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
}

export default LoadingSpinner;