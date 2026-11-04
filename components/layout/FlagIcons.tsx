import React from 'react';

export const FlagIT: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (
  <svg
    className={`inline-block rounded-xs shadow-xs border border-black/10 overflow-hidden shrink-0 ${className}`}
    viewBox="0 0 3 2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="1" height="2" fill="#009246" />
    <rect width="1" height="2" x="1" fill="#ffffff" />
    <rect width="1" height="2" x="2" fill="#ce2b37" />
  </svg>
);

/** English is for guests from every country, not only Britain: a globe in the brand's gold, not a flag. */
export const FlagEN: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (
  <svg
    className={`inline-block shrink-0 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ba935a"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);
