import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      containerClassName = '',
      className = '',
      id,
      ...rest
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={`space-y-1.5 w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[11px] font-bold uppercase tracking-wider text-[#6e675e] dark:text-[#a8a095]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-[#ba935a] pointer-events-none shrink-0">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full p-3 bg-white dark:bg-[#1e1b18] border text-xs sm:text-sm text-[#1a1816] dark:text-[#faf7f2] placeholder-[#8c8479] focus:outline-none transition-colors ${
              leftIcon ? 'pl-9' : 'pl-3'
            } ${rightIcon ? 'pr-9' : 'pr-3'} ${
              error
                ? 'border-red-500 focus:border-red-600'
                : 'border-[#ba935a]/40 focus:border-[#ba935a]'
            } ${className}`}
            {...rest}
          />
          {rightIcon && (
            <div className="absolute right-3 text-[#ba935a] shrink-0">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-[11px] text-red-500 font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
