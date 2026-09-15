import React from 'react';

export type CardVariant = 'glass' | 'solid' | 'gold' | 'dark';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  hasCornerBrackets?: boolean;
  hoverLift?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  glass: 'bg-white/95 backdrop-blur-xl border border-[#ba935a]/40 shadow-[0_15px_40px_rgba(0,0,0,0.15)] text-[#1a1816]',
  solid: 'bg-white border border-[#ba935a]/25 shadow-sm text-[#1a1816]',
  gold: 'bg-gradient-to-br from-[#faf7f2] via-[#f7efe1] to-[#eedbc1] border-2 border-[#ba935a] shadow-md text-[#1a1816]',
  dark: 'bg-[#1a1816] border border-[#ba935a]/30 shadow-2xl text-[#faf7f2]',
};

const paddingStyles: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3 sm:p-4',
  md: 'p-6 sm:p-8',
  lg: 'p-8 sm:p-12',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'glass',
      padding = 'md',
      hasCornerBrackets = false,
      hoverLift = false,
      className = '',
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`relative ${variantStyles[variant]} ${paddingStyles[padding]} ${
          hoverLift ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl' : ''
        } ${className}`}
        {...rest}
      >
        {hasCornerBrackets && (
          <>
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ba935a] pointer-events-none" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ba935a] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ba935a] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ba935a] pointer-events-none" />
          </>
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
