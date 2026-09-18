'use client';

import React from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'glass' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  rel?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#ba935a] hover:bg-[#a37f48] text-white border-2 border-[#ba935a] hover:border-[#a37f48] shadow-casa-gold',
  outline:
    'bg-[#faf7f2] dark:bg-[#faf7f2] hover:bg-[#ba935a] dark:hover:bg-[#ba935a] text-[#ba935a] hover:text-white border-2 border-[#ba935a] shadow-xs',
  ghost:
    'bg-transparent hover:bg-[#ba935a]/10 text-[#ba935a] border-2 border-transparent',
  glass:
    'bg-white/90 backdrop-blur-md hover:bg-white text-[#1a1816] border border-[#ba935a]/40 hover:border-[#ba935a] shadow-sm',
  dark:
    'bg-[#1a1816] hover:bg-[#332f2b] text-white border-2 border-[#1a1816] hover:border-[#332f2b] shadow-md',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs tracking-wider gap-1.5',
  md: 'px-6 py-3 text-xs sm:text-sm tracking-wider gap-2',
  lg: 'px-8 py-4 text-sm sm:text-base tracking-widest gap-2.5',
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      href,
      target,
      rel,
      leftIcon,
      rightIcon,
      isLoading = false,
      disabled = false,
      className = '',
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-bold uppercase transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';
    const combinedClasses = `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    const content = (
      <>
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </>
    );

    if (href && !disabled) {
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={combinedClasses}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        type={type}
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled || isLoading}
        className={combinedClasses}
        {...rest}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
