'use client';

import React from 'react';
import { MedalSocialCard, MedalSocialCardProps } from '@/components/medal';

export type TablePortalCardProps = Partial<MedalSocialCardProps> & {
  wifiSsid?: string;
  wifiPass?: string;
  wifiCopied?: boolean;
  onCopyWifi?: () => void;
};

export const TablePortalCard: React.FC<TablePortalCardProps> = ({
  onOpenMap = () => {},
  onShare = () => {},
  copied = false,
}) => {
  return (
    <MedalSocialCard
      onOpenMap={onOpenMap}
      onShare={onShare}
      copied={copied}
    />
  );
};

