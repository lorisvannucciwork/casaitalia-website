import React from 'react';
import {
  GoogleMapsIcon,
  TripAdvisorIcon,
  WhatsAppIcon,
  InstagramIcon,
  TikTokIcon,
  FacebookIcon,
} from '@/components/ui/icons';

export {
  GoogleMapsIcon,
  TripAdvisorIcon,
  WhatsAppIcon,
  InstagramIcon,
  TikTokIcon,
  FacebookIcon,
};

export type SocialBrand = 'google' | 'tripadvisor' | 'whatsapp' | 'instagram' | 'tiktok' | 'facebook';

export interface SocialBrandIconProps {
  brand: SocialBrand;
  className?: string;
}

export const SocialBrandIcon: React.FC<SocialBrandIconProps> = ({ brand, className }) => {
  switch (brand) {
    case 'google':
      return <GoogleMapsIcon className={className} />;
    case 'tripadvisor':
      return <TripAdvisorIcon className={className} />;
    case 'whatsapp':
      return <WhatsAppIcon className={className} />;
    case 'instagram':
      return <InstagramIcon className={className} />;
    case 'tiktok':
      return <TikTokIcon className={className} />;
    case 'facebook':
      return <FacebookIcon className={className} />;
  }
};
