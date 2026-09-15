'use client';

import React from 'react';

export interface LegalNoticeCardProps {
  variant?: 'gold' | 'amber';
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const LegalNoticeCard: React.FC<LegalNoticeCardProps> = ({
  variant = 'gold',
  title,
  icon,
  children,
  className = '',
}) => {
  const borderClass = variant === 'amber' ? 'border-amber-600' : 'border-[#ba935a]';
  const titleClass = variant === 'amber' ? 'text-amber-800' : 'text-[#ba935a]';

  return (
    <div className={`bg-[#faf7f2] p-4 border-l-2 ${borderClass} text-xs text-[#6e675e] space-y-1.5 ${className}`}>
      {title && (
        <div className={`flex items-center gap-1.5 font-bold uppercase tracking-wider ${titleClass}`}>
          {icon}
          <span>{title}</span>
        </div>
      )}
      <div className="leading-relaxed">{children}</div>
    </div>
  );
};
