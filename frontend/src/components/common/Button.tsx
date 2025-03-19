import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'px-4 py-2 rounded-lg transition-colors duration-300 font-medium';
  const variantClasses = variant === 'primary'
    ? 'bg-sky-blue-primary text-white hover:bg-sky-blue-secondary'
    : 'border-2 border-sky-blue-primary text-sky-blue-primary hover:bg-sky-blue-primary hover:text-white';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${isLoading ? 'opacity-75 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button; 