import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      iconPosition = 'left',
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const inputStyles = cn(
      'block w-full rounded-md border-gray-300 shadow-sm transition-colors',
      'focus:border-primary-500 focus:ring-primary-500 focus:ring-1',
      'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
      error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
      icon && iconPosition === 'left' && 'pl-10',
      icon && iconPosition === 'right' && 'pr-10',
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div
              className={cn(
                'absolute inset-y-0 flex items-center pointer-events-none',
                iconPosition === 'left' ? 'left-0 pl-3' : 'right-0 pr-3'
              )}
            >
              <div className="w-5 h-5 text-gray-400">{icon}</div>
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={inputStyles}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            {...props}
          />
        </div>

        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;