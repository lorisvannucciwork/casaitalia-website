import React from 'react';
import { TopProgressBar, CasaBrandLoader } from '@/components/ui/Skeleton';

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#ededed] flex items-center justify-center relative">
      <TopProgressBar />
      <CasaBrandLoader label="Caricamento Casa Italia..." />
    </div>
  );
}
