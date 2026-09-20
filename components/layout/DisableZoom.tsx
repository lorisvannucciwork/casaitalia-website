'use client';

import { useEffect } from 'react';

export const DisableZoom: React.FC = () => {
  useEffect(() => {

    let lastTouchEnd = 0;
    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        const target = e.target as HTMLElement | null;
        const isInteractive =
          target &&
          (target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.tagName === 'SELECT' ||
            target.isContentEditable);
        if (!isInteractive && e.cancelable) {
          e.preventDefault();
        }
      }
      lastTouchEnd = now;
    };

    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return null;
};
