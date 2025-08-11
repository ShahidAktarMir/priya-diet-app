import React from 'react';

function Input({ 
  name, 
  placeholder, 
  register, 
  error, 
  type = "text",
  className = "",
  ...props 
}) {
  return (
    <div className="mb-4">
      <input
        type={type}
        placeholder={placeholder}
        className={`form-input border-2 border-secondary-200 p-4 rounded-xl w-full transition-all duration-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none bg-white/80 backdrop-blur-sm ${
          error ? 'border-error-500 bg-error-50/50 focus:border-error-500 focus:ring-error-100' : 'hover:border-secondary-300 hover:bg-white'
        } ${className}`}
        {...register}
        {...props}
      />
      {error && (
        <span className="text-error-600 text-sm mt-2 block font-medium animate-slide-in-up">
          {error.message}
        </span>
      )}
    </div>
  );
}

export default Input;