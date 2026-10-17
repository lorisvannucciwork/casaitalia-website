'use client';

import React, { useEffect } from 'react';
import { MedalView } from '@/components/medal';

export interface TablePortalViewProps {
  className?: string;
}

export const TablePortalView: React.FC<TablePortalViewProps> = ({ className = '' }) => {
  useEffect(() => {
    try {
      localStorage.setItem('casaItaliaScannedViaQR', 'true');
      localStorage.removeItem('casaItaliaTableNumber');
      localStorage.removeItem('casaItaliaTableNumOnly');
    } catch {

    }
  }, []);

  return <MedalView className={className} />;
};

