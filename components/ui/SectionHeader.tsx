import React from 'react';

export interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  hasDivider?: boolean;
  light?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  align = 'left',
  hasDivider = true,
  light = false,
  className = '',
}) => {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const dividerAlign = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto',
  };

  return (
    <div className={`space-y-4 flex flex-col ${alignClasses[align]} ${className}`}>
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-tight ${
          light ? 'text-white drop-shadow-md' : 'text-[#1a1816]'
        }`}
      >
        {title}{' '}
        {subtitle && (
          <span className="text-[#ba935a] font-accent font-normal text-4xl sm:text-5xl lg:text-6xl px-2">
            {subtitle}
          </span>
        )}
      </h2>

      {hasDivider && (
        <div className={`w-24 h-[2px] bg-[#ba935a]/60 ${dividerAlign[align]}`} />
      )}

      {description && (
        <p
          className={`max-w-2xl text-base sm:text-lg leading-relaxed font-medium ${
            light ? 'text-[#faf7f2]/90' : 'text-[#6e675e]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
