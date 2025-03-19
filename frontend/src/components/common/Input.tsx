import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  name,
  error,
  helperText,
  className = '',
  required,
  disabled,
  type = 'text',
  ...props
}, ref) => {
  const inputId = `input-${name}`;
  
  const baseStyles = 'w-full px-4 py-2 border rounded-lg transition-colors duration-300';
  const stateStyles = error
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300 focus:ring-sky-blue-primary focus:border-sky-blue-primary';
  const focusStyles = 'focus:outline-none focus:ring-2';
  const disabledStyles = disabled ? 'bg-gray-100 cursor-not-allowed' : '';

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        ref={ref}
        id={inputId}
        name={name}
        type={type}
        disabled={disabled}
        className={`
          ${baseStyles}
          ${stateStyles}
          ${focusStyles}
          ${disabledStyles}
          ${className}
        `}
        {...props}
      />
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 