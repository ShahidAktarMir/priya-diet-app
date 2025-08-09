import React from 'react';

function Textarea({ 
  name, 
  placeholder, 
  register, 
  error, 
  rows = 3,
  className = "",
  ...props 
}) {
  return (
    <div className="mb-4">
      <textarea
        rows={rows}
        placeholder={placeholder}
        className={`border border-gray-300 p-3 rounded-lg w-full transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none resize-vertical ${
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

export default Textarea;