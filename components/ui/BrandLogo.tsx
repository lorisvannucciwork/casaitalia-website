import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type BrandLogoSize = 'sm' | 'md' | 'lg' | 'hero';

export interface BrandLogoProps {
  size?: BrandLogoSize;
  asLink?: boolean;
  priority?: boolean;
  className?: string;
  alt?: string;
}

const sizeStyles: Record<BrandLogoSize, string> = {
  sm: 'h-8 w-28 sm:h-9 sm:w-32',
  md: 'h-10 w-36 sm:h-12 sm:w-44',
  lg: 'h-14 w-48 sm:h-16 sm:w-56',
  hero: 'h-24 w-64 sm:h-32 sm:w-80',
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  asLink = false,
  priority = false,
  className = '',
  alt = 'Casa Italia Ristorante',
}) => {
  const logo = (
    <div className={`relative shrink-0 drop-shadow-sm ${sizeStyles[size]} ${className}`}>
      <Image
        src="/logo/logo-01.svg"
        alt={alt}
        fill
        priority={priority}
        className="object-contain"
      />
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" className="inline-block transition-transform duration-200 hover:scale-[1.02]">
        {logo}
      </Link>
    );
  }

  return logo;
};
