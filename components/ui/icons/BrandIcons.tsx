import React from 'react';
import type { IconProps } from './SocialIcons';

export const LuxuryVillaIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <path d="M2 21H22" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 21V11" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 21V11" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 21V11" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 21V11" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 21V11" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 11L12 3L22 11H2Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);
