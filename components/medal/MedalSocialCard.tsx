'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { MedalActionButtons } from './MedalActionButtons';

export interface MedalSocialCardProps {
  onOpenMap: () => void;
  onShare: () => void;
  copied: boolean;
}

export const MedalSocialCard: React.FC<MedalSocialCardProps> = ({
  onOpenMap,
  onShare,
  copied,
}) => {
  return (
    <Card
      variant="glass"
      padding="sm"
      hasCornerBrackets
      className="w-full max-h-full px-3.5 py-3 sm:px-6 sm:py-4 flex flex-col items-center text-center relative overflow-y-auto scrollbar-none"
    >
      {/* Brand Logo */}
      <BrandLogo size="md" asLink priority className="mb-3" />

      {/* Action Buttons */}
      <MedalActionButtons
        onOpenMap={onOpenMap}
        onShare={onShare}
        copied={copied}
      />

      {/* Footer Address Note */}
      <div className="mt-3 pt-2.5 border-t border-[#ba935a]/20 w-full flex items-center justify-center gap-1 text-[10px] text-[#8c8479] shrink-0">
        <span>Porto Ghalib Marina • Marsa Alam, Egypt</span>
      </div>
    </Card>
  );
};
