import React from 'react';

export type BadgeVariant = 'gold' | 'emerald' | 'amber' | 'neutral' | 'dark';
export type BadgeSize = 'xs' | 'sm' | 'md';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  gold: 'bg-[#ba935a] text-white border border-[#ba935a]/30 shadow-xs',
  emerald: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/50',
  amber: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/50',
  neutral: 'bg-[#f4efe6] dark:bg-[#262320] text-[#6e675e] dark:text-[#a8a095] border border-[#ba935a]/20',
  dark: 'bg-[#1a1816] text-[#faf7f2] border border-[#ba935a]/30',
};

const sizeStyles: Record<BadgeSize, string> = {
  xs: 'px-1.5 py-0.5 text-[9px] font-bold tracking-wider',
  sm: 'px-2 py-0.5 text-[10px] font-bold tracking-wider',
  md: 'px-3 py-1 text-xs font-bold tracking-wider',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'xs',
  icon,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1 uppercase select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
