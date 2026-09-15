import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  backgroundImage?: string;
  overlayColor?: string;
  containerMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '7xl' | 'full';
  containerClassName?: string;
  hasPattern?: boolean;
}

const maxWidthStyles = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

export const Section: React.FC<SectionProps> = ({
  children,
  backgroundImage,
  overlayColor = 'bg-[#faf7f2]/80',
  containerMaxWidth = '7xl',
  containerClassName = '',
  hasPattern = false,
  className = '',
  ...rest
}) => {
  return (
    <section
      className={`relative z-10 py-16 sm:py-24 ${
        backgroundImage ? 'bg-cover bg-center bg-no-repeat' : ''
      } ${className}`}
      style={backgroundImage ? { backgroundImage: `url('${backgroundImage}')` } : undefined}
      {...rest}
    >
      {backgroundImage && overlayColor && (
        <div className={`absolute inset-0 z-0 ${overlayColor}`} />
      )}
      {hasPattern && (
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ba935a_1px,transparent_1px)] [background-size:14px_14px] z-0 pointer-events-none" />
      )}
      <div
        className={`mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${maxWidthStyles[containerMaxWidth]} ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
};
