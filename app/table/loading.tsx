import React from 'react';
import { TopProgressBar, TablePortalSkeleton } from '@/components/ui/Skeleton';

export default function TableLoading() {
  return (
    <div className="min-h-screen bg-[#141210] text-[#faf7f2] relative selection:bg-[#ba935a]">
      <TopProgressBar />
      <TablePortalSkeleton />
    </div>
  );
}
