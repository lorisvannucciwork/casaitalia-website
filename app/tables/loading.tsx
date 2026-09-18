import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout';
import { TopProgressBar, MedalCardSkeleton } from '@/components/ui/Skeleton';

export default function TablesLoading() {
  return (
    <div className="h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col bg-[#ededed] text-[#1a1816] font-sans antialiased relative">
      <TopProgressBar />
      <Navbar />

      <main className="flex-1 w-full h-full max-h-full overflow-hidden relative flex flex-col items-center justify-center pt-[70px] sm:pt-[80px] pb-3 px-3 sm:px-4">
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/backgrounds/bg-2.webp"
            alt="Casa Italia Background"
            fill
            priority
            className="object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
        </div>

        <div className="w-full max-w-md mx-auto my-auto relative z-10 py-1 flex flex-col items-center justify-center max-h-[calc(100dvh-85px)]">
          <MedalCardSkeleton />
        </div>
      </main>
    </div>
  );
}
