'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Website runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#1a1816] text-[#faf7f2] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-[#262320] border-2 border-[#ba935a]/50 p-8 space-y-6 shadow-2xl">
        <div className="w-14 h-14 bg-[#ba935a]/20 border border-[#ba935a] flex items-center justify-center mx-auto text-[#ba935a]">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif font-bold text-2xl text-[#faf7f2]">
            Something Went Wrong
          </h2>
          <p className="text-xs text-[#8c8479]">
            We apologize for the inconvenience. An unexpected system error occurred.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 py-3 bg-[#ba935a] hover:bg-[#a37f48] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="flex-1 py-3 bg-[#1a1816] hover:bg-[#332f2b] text-[#faf7f2] text-xs font-bold uppercase tracking-wider border border-[#ba935a]/30 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
