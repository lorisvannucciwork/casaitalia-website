'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Website root layout error:', error);
  }, [error]);

  return (
    <html lang="it">
      <body className="min-h-screen bg-[#ededed] text-[#1a1816] flex flex-col items-center justify-center p-6 text-center font-sans antialiased m-0">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-md border-2 border-[#ba935a]/40 p-8 sm:p-10 space-y-6 shadow-[0_20px_50px_rgba(186,147,90,0.15)]">
          <div className="w-14 h-14 bg-[#ba935a]/10 border border-[#ba935a]/40 flex items-center justify-center mx-auto text-[#ba935a] shadow-sm">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif font-bold text-2xl text-[#1a1816]">
              Casa Italia Ristorante
            </h2>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ba935a]">
              Qualcosa è andato storto
            </p>
            <div className="w-12 h-[2px] bg-[#ba935a]/30 mx-auto my-2" />
            <p className="text-xs text-[#524d46] leading-relaxed">
              Si è verificato un errore imprevisto. Riprova a ricaricare la pagina o torna alla homepage.
            </p>
            <p className="text-[11px] text-[#8c8479] leading-relaxed italic">
              An unexpected error occurred. Please try reloading or return to the homepage.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="flex-1 py-3.5 bg-[#ba935a] hover:bg-[#a37f48] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer border-0"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Riprova</span>
            </button>
            <Link
              href="/"
              className="flex-1 py-3.5 bg-[#1a1816] hover:bg-[#ba935a] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 no-underline border-0"
            >
              <Home className="w-4 h-4" />
              <span>Homepage</span>
            </Link>
          </div>

          {error?.digest && (
            <p className="text-[10px] text-[#8c8479] font-mono pt-3 border-t border-stone-200">
              Error Digest: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
