'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function TableMenuRedirect() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (params?.table) {
      const raw = Array.isArray(params.table) ? params.table[0] : params.table;
      const num = parseInt(raw.replace(/\D/g, ''), 10) || 7;
      const formatted = num < 10 ? `Table 0${num}` : `Table ${num}`;

      // Save scanned table number & QR verification to localStorage
      localStorage.setItem('casaItaliaTableNumber', formatted);
      localStorage.setItem('casaItaliaTableNumOnly', String(num));
      localStorage.setItem('casaItaliaScannedViaQR', 'true');
    }
    // Redirect seamlessly to full interactive menu
    router.replace('/menu');
  }, [params, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ededed] text-[#1a1816]">
      <div className="text-center space-y-2 p-6 bg-[#faf7f2] border-2 border-[#ba935a] shadow-xl max-w-sm mx-auto">
        <div className="w-8 h-8 border-2 border-[#ba935a] border-t-transparent rounded-full animate-spin mx-auto" />
        <h2 className="font-serif font-bold text-2xl text-[#1a1816]">Welcome to Casa Italia</h2>
        <p className="text-xs text-[#ba935a] font-semibold uppercase tracking-wider">
          Connecting Table {params?.table}...
        </p>
      </div>
    </div>
  );
}
