'use client';

import React from 'react';

/**
 * Base atomic Skeleton primitive with luxury Casa Italia champagne/gold shimmer.
 * Supports light (warm cream/gold) and dark (charcoal/gold) color schemes.
 */
export const Skeleton: React.FC<{
  className?: string;
  variant?: 'rectangular' | 'circular' | 'rounded' | 'text';
  theme?: 'light' | 'dark';
  style?: React.CSSProperties;
}> = ({ className = '', variant = 'rectangular', theme = 'light', style }) => {
  const variantClass =
    variant === 'circular'
      ? 'rounded-full'
      : variant === 'rounded'
      ? 'rounded-md'
      : variant === 'text'
      ? 'rounded-xs my-1'
      : 'rounded-none';

  const themeClass =
    theme === 'dark'
      ? 'bg-[#262320] border border-[#ba935a]/20'
      : 'bg-[#ede5d6] border border-[#ba935a]/15';

  const shimmerClass =
    theme === 'dark'
      ? 'bg-gradient-to-r from-transparent via-[#ba935a]/20 to-transparent'
      : 'bg-gradient-to-r from-transparent via-white/70 to-transparent';

  return (
    <div
      className={`relative overflow-hidden ${themeClass} ${variantClass} ${className}`}
      style={style}
    >
      <div className={`absolute inset-0 ${shimmerClass} animate-shimmer`} />
    </div>
  );
};

/**
 * Subtle luxury top progress bar for route navigation and async data loading.
 */
export const TopProgressBar: React.FC<{ active?: boolean }> = ({ active = true }) => {
  if (!active) return null;
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[2.5px] bg-[#1a1816]/10 overflow-hidden pointer-events-none"
      role="progressbar"
      aria-label="Loading page"
    >
      <div className="h-full w-full bg-gradient-to-r from-[#ba935a] via-[#f7f2e8] to-[#ba935a] animate-progress-bar shadow-[0_0_10px_#ba935a]" />
    </div>
  );
};

/**
 * Centered Casa Italia luxury pulse loader
 */
export const CasaBrandLoader: React.FC<{
  label?: string;
  theme?: 'light' | 'dark';
}> = ({ label = 'Casa Italia...', theme = 'light' }) => {
  const isDark = theme === 'dark';

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 select-none">
      <div className="relative w-14 h-14 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-[#ba935a]/25" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#ba935a] border-r-[#ba935a]/60 animate-spin" />
        <div className="w-6 h-6 rounded-full bg-[#ba935a]/20 animate-ping" />
      </div>
      <div className="text-center space-y-1">
        <span className="font-serif font-bold text-sm tracking-widest uppercase text-[#ba935a] block">
          Casa Italia
        </span>
        {label && (
          <p
            className={`text-xs font-medium tracking-wide animate-pulse ${
              isDark ? 'text-[#a8a095]' : 'text-[#6e675e]'
            }`}
          >
            {label}
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * Exact 1:1 skeleton replica of a single DishCard
 */
export const DishCardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`relative bg-white/70 backdrop-blur-2xl p-2.5 sm:p-3 overflow-hidden border border-white/60 shadow-lg flex flex-col h-full ${className}`}
    >
      {/* Food Image Container Skeleton */}
      <div className="relative w-full h-52 sm:h-60 bg-[#f5eedf] overflow-hidden shadow-inner shrink-0 flex items-center justify-center">
        {/* Shimmer sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />

        {/* Brand watermark placeholder */}
        <div className="relative z-10 flex flex-col items-center opacity-40">
          <span className="font-signature text-2xl text-[#ba935a]">Casa Italia</span>
        </div>

        {/* Badge skeleton placeholder */}
        <div className="absolute top-2 left-2 z-20">
          <Skeleton className="h-5 w-20 bg-white/80" />
        </div>
      </div>

      {/* Body Information Skeleton */}
      <div className="px-2 sm:px-3 pt-4 pb-2 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Title & Italian Subtitle */}
          <div className="space-y-1">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-3.5 w-1/2" />
          </div>

          {/* Description lines */}
          <div className="space-y-1.5 pt-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        </div>

        {/* Footer: Price & Dietary Chips */}
        <div className="pt-3 border-t border-[#ba935a]/15 flex items-center justify-between">
          <Skeleton className="h-5 w-20" />
          <div className="flex items-center gap-1.5">
            <Skeleton variant="circular" className="w-5 h-5" />
            <Skeleton variant="circular" className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Category Navigation Pills Skeleton
 */
export const CategoryNavSkeleton: React.FC = () => {
  return (
    <div className="w-full overflow-hidden py-2">
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-9 sm:h-10 w-24 sm:w-28 shrink-0 bg-white/60 border border-[#ba935a]/25"
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Full Menu Grid Skeleton (Header + Pills + 6 Dish Cards)
 */
export const MenuGridSkeleton: React.FC<{ cardCount?: number }> = ({ cardCount = 6 }) => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Category Nav Skeletons */}
      <CategoryNavSkeleton />

      {/* Menu Header Title Skeleton */}
      <div className="border-b border-[#ba935a]/25 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 sm:h-10 w-44 sm:w-60 bg-white/80" />
          <Skeleton className="h-4 w-28 bg-white/60" />
        </div>
        <Skeleton className="h-9 w-32 hidden sm:block bg-white/60" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {Array.from({ length: cardCount }).map((_, i) => (
          <DishCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

/**
 * Social / Medal Card Skeleton for /tables and /medal
 */
export const MedalCardSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-white/85 backdrop-blur-md border-2 border-[#ba935a]/40 shadow-2xl p-6 sm:p-8 space-y-6">
      {/* Avatar / Logo Skeleton */}
      <div className="flex flex-col items-center text-center space-y-3">
        <Skeleton variant="circular" className="w-20 h-20 bg-[#f5eedf]" />
        <Skeleton className="h-7 w-48 bg-[#f5eedf]" />
        <Skeleton className="h-4 w-32 bg-[#f5eedf]" />
      </div>

      {/* Action Buttons Skeletons */}
      <div className="space-y-3 pt-2">
        <Skeleton className="h-12 w-full bg-[#f5eedf]" />
        <Skeleton className="h-12 w-full bg-[#f5eedf]" />
        <Skeleton className="h-12 w-full bg-[#f5eedf]" />
      </div>

      {/* Bottom Share / Footer */}
      <div className="pt-2 flex items-center justify-between border-t border-[#ba935a]/20">
        <Skeleton className="h-4 w-24 bg-[#f5eedf]" />
        <Skeleton className="h-4 w-24 bg-[#f5eedf]" />
      </div>
    </div>
  );
};

/**
 * Seated Table Guest Portal Skeleton for /table
 */
export const TablePortalSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#141210] text-[#faf7f2] flex flex-col justify-between p-4 max-w-lg mx-auto w-full space-y-6">
      <div className="flex items-center justify-between pt-4">
        <Skeleton theme="dark" className="h-8 w-32" />
        <Skeleton theme="dark" className="h-8 w-16" />
      </div>

      <div className="space-y-4 flex-1">
        {/* Banner */}
        <div className="space-y-2 text-center flex flex-col items-center">
          <Skeleton theme="dark" className="h-6 w-40" />
          <Skeleton theme="dark" className="h-8 w-64" />
          <Skeleton theme="dark" className="h-4 w-48" />
        </div>

        {/* Big Menu Card */}
        <Skeleton theme="dark" className="h-40 w-full" />

        {/* Wi-Fi Card */}
        <Skeleton theme="dark" className="h-32 w-full" />

        {/* Concierge Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Skeleton theme="dark" className="h-20 w-full" />
          <Skeleton theme="dark" className="h-20 w-full" />
        </div>
      </div>

      <div className="text-center py-2">
        <Skeleton theme="dark" className="h-3 w-40 mx-auto" />
      </div>
    </div>
  );
};

/**
 * Legal Page Skeleton for /privacy, /terms, and /cookies
 */
export const LegalPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ededed] flex flex-col pt-[85px] pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full space-y-6">
        <div className="bg-white/80 backdrop-blur-md p-6 sm:p-10 border border-[#ba935a]/30 shadow-lg space-y-6">
          <Skeleton className="h-8 sm:h-10 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <div className="h-[1px] bg-[#ba935a]/25 w-full my-4" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="space-y-3 pt-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
};
