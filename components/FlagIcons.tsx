import React from 'react';

export const FlagIT: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 640 480" className={`rounded-[2px] shadow-sm shrink-0 border border-black/10 ${className}`}>
    <rect width="213.3" height="480" fill="#009246" />
    <rect x="213.3" width="213.4" height="480" fill="#ffffff" />
    <rect x="426.7" width="213.3" height="480" fill="#ce2b37" />
  </svg>
);

export const FlagEN: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 640 480" className={`rounded-[2px] shadow-sm shrink-0 border border-black/10 ${className}`}>
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path stroke="#fff" strokeWidth="60" d="m0 0 640 480M0 480 640 0"/>
    <path stroke="#C8102E" strokeWidth="40" d="m0 0 640 480M0 480 640 0"/>
    <path stroke="#fff" strokeWidth="100" d="M320 0v480M0 240h640"/>
    <path stroke="#C8102E" strokeWidth="60" d="M320 0v480M0 240h640"/>
  </svg>
);
