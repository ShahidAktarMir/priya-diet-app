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
        className={`border border-gray-300 p-3 rounded-lg w-full transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none ${
          error ? 'border-red-500 bg-red-50' : 'hover:border-gray-400'
        } ${className}`}
        {...register}
        {...props}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1 block font-medium">
          {error.message}
        </span>
      )}
    </div>
  );
}

export default Input;