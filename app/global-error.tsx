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
      <body className="min-h-screen bg-[#141210] text-[#faf7f2] flex flex-col items-center justify-center p-6 text-center font-sans antialiased m-0">
        <div className="max-w-md w-full bg-[#1a1816] border-2 border-[#ba935a]/50 p-8 space-y-6 shadow-2xl">
          <div className="w-14 h-14 bg-[#ba935a]/20 border border-[#ba935a] flex items-center justify-center mx-auto text-[#ba935a]">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif font-bold text-2xl text-[#faf7f2]">
              Casa Italia Ristorante
            </h2>
            <p className="text-sm font-medium text-[#ba935a]">
              Qualcosa è andato storto
            </p>
            <p className="text-xs text-[#8c8479] leading-relaxed">
              Si è verificato un errore imprevisto. Riprova a ricaricare la pagina o torna alla homepage.
            </p>
            <p className="text-[10px] text-[#6e675e] leading-relaxed italic">
              An unexpected error occurred. Please try reloading or return to the homepage.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="flex-1 py-3 bg-[#ba935a] hover:bg-[#a37f48] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer border-0"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Riprova</span>
            </button>
            <Link
              href="/"
              className="flex-1 py-3 bg-[#262320] hover:bg-[#332f2b] text-[#faf7f2] text-xs font-bold uppercase tracking-wider border border-[#ba935a]/30 transition-colors flex items-center justify-center gap-2 no-underline"
            >
              <Home className="w-4 h-4" />
              <span>Homepage</span>
            </Link>
          </div>

          {error?.digest && (
            <p className="text-[10px] text-[#524d46] font-mono">
              Error Digest: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
