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

export const FlagEN: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (
  <svg
    className={`inline-block rounded-xs shadow-xs border border-black/10 overflow-hidden shrink-0 ${className}`}
    viewBox="0 0 60 30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);
