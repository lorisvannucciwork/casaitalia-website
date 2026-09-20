import React from 'react';
import { Navbar, Footer } from '@/components/layout';
import { Hero } from './Hero';
import { StorySection } from './StorySection';

export interface HomeViewProps {
  className?: string;
}

export const HomeView: React.FC<HomeViewProps> = ({ className = '' }) => {
  return (
    <div className={`min-h-screen flex flex-col bg-[#ededed] text-[#1a1816] font-sans antialiased selection:bg-[#ba935a] selection:text-white ${className}`}>

      <Navbar />

      <main className="flex-1 relative">
        <div className="fixed inset-0 z-0 bg-[url('/backgrounds/bg-1.webp')] bg-cover bg-center bg-no-repeat" />

        <div className="relative z-10">
          <Hero />
        </div>

        <StorySection />
      </main>

      <Footer />
    </div>
  );
};
