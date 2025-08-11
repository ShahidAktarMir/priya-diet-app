import React from 'react';

function Button({ 
  children, 
  onClick, 
  disabled, 
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  ...props 
}) {
  const baseClasses = "btn-premium font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform-gpu";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 focus:ring-primary-500 disabled:from-primary-300 disabled:to-primary-400 shadow-soft hover:shadow-glow",
    secondary: "bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-800 hover:from-secondary-200 hover:to-secondary-300 focus:ring-secondary-500 disabled:from-secondary-50 disabled:to-secondary-100 shadow-soft",
    success: "bg-gradient-to-r from-success-600 to-success-700 text-white hover:from-success-700 hover:to-success-800 focus:ring-success-500 disabled:from-success-300 disabled:to-success-400 shadow-soft",
    danger: "bg-gradient-to-r from-error-600 to-error-700 text-white hover:from-error-700 hover:to-error-800 focus:ring-error-500 disabled:from-error-300 disabled:to-error-400 shadow-soft",
    accent: "bg-gradient-to-r from-accent-600 to-accent-700 text-white hover:from-accent-700 hover:to-accent-800 focus:ring-accent-500 disabled:from-accent-300 disabled:to-accent-400 shadow-soft hover:shadow-glow-accent",
  };
  
  const sizes = {
    sm: "px-4 py-2.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${
        disabled ? 'cursor-not-allowed opacity-50 transform-none' : 'cursor-pointer hover:scale-105 active:scale-95'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;