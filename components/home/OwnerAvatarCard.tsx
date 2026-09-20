'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

export interface OwnerAvatarCardProps {
  src: string;
  alt: string;
  positionClass: string;
  zIndexClass: string;
}

export const OwnerAvatarCard: React.FC<OwnerAvatarCardProps> = ({
  src,
  alt,
  positionClass,
  zIndexClass,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`absolute w-[65%] aspect-[3/4] overflow-hidden border-8 border-[#faf7f2] bg-[#f7f2e8] group ${positionClass} ${zIndexClass}`}
    >
      {!imgError && src ? (
        <>

          {!imgLoaded && (
            <div className="absolute inset-0 bg-[#f7f2e8] flex items-center justify-center overflow-hidden z-0 select-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
              <div className="relative z-10 w-16 h-16 rounded-full border border-[#ba935a]/30 flex items-center justify-center bg-white/80 shadow-sm animate-pulse">
                <User className="w-8 h-8 text-[#ba935a]/70" />
              </div>
            </div>
          )}

          <Image
            src={src}
            alt={alt}
            fill
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`object-cover group-hover:scale-105 transition-all duration-700 ease-out ${
              imgLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-xs pointer-events-none'
            }`}
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#faf7f2] via-[#f5e9d3] to-[#e8d5b7] flex flex-col items-center justify-center p-4 text-center select-none group-hover:scale-105 transition-transform duration-700 ease-out">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ba935a_1px,transparent_1px)] [background-size:14px_14px]" />

          <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 border-[#ba935a]/50 shadow-xl flex items-center justify-center mb-3 group-hover:border-[#ba935a] transition-colors">
            <div className="w-[88%] h-[88%] rounded-full border border-[#ba935a]/20 flex items-center justify-center bg-[#faf7f2] shadow-inner">
              <User className="w-12 h-12 sm:w-14 sm:h-14 text-[#ba935a]/85 stroke-[1.6]" />
            </div>
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1816]/30 via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
};
