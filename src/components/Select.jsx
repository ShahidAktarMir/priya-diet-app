import React from 'react';

function Select({ 
  name, 
  placeholder, 
  register, 
  error, 
  options = [],
  className = "",
  ...props 
}) {
  return (
    <div className="mb-4">
      <select
        className={`border border-gray-300 p-3 rounded-lg w-full transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-white ${
          error ? 'border-red-500 bg-red-50' : 'hover:border-gray-400'
        } ${className}`}
        {...register}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-red-500 text-sm mt-1 block font-medium">
          {error.message}
        </span>
      )}
    </div>
  );
}

export default Select;