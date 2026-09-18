import React from 'react';
import { Navbar, Footer } from '@/components/layout';
import { TopProgressBar, MenuGridSkeleton } from '@/components/ui/Skeleton';

export default function MenuLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#ededed] text-[#1a1816] font-sans antialiased">
      <TopProgressBar />
      <Navbar />

      <main className="flex-1 relative">
        <div className="absolute inset-0 z-0 bg-[url('/backgrounds/bg-1.webp')] bg-[length:100%_auto] bg-repeat-y opacity-80" />

        <section id="menu-section" className="relative z-10 pt-[90px] sm:pt-[110px] pb-8 sm:pb-12 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-6">
            <MenuGridSkeleton cardCount={6} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
