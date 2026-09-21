'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';

export interface ErrorViewProps {
  error: Error & { digest?: string };
  reset: () => void;
  className?: string;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ error, reset, className = '' }) => {
  useEffect(() => {
    console.error('Website runtime error:', error);
  }, [error]);

  return (
    <div className={`min-h-screen bg-[#ededed] text-[#1a1816] flex flex-col items-center justify-center p-6 text-center font-sans antialiased ${className}`}>
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md border-2 border-[#ba935a]/40 p-8 sm:p-10 space-y-6 shadow-[0_20px_50px_rgba(186,147,90,0.15)]">
        <div className="w-14 h-14 bg-[#ba935a]/10 border border-[#ba935a]/40 flex items-center justify-center mx-auto text-[#ba935a] shadow-sm">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif font-bold text-2xl text-[#1a1816]">
            Something Went Wrong
          </h2>
          <div className="w-12 h-[2px] bg-[#ba935a]/30 mx-auto my-2" />
          <p className="text-xs sm:text-sm text-[#524d46] leading-relaxed">
            We apologize for the inconvenience. An unexpected system error occurred.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 py-3.5 bg-[#ba935a] hover:bg-[#a37f48] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer border-0"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="flex-1 py-3.5 bg-[#1a1816] hover:bg-[#ba935a] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 no-underline border-0"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
