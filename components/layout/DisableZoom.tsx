'use client';

import { useEffect } from 'react';

/**
 * Disables zooming (pinch, double-tap, keyboard zoom, and trackpad/ctrl-wheel)
 * across mobile devices, tablets, and desktop browsers to maintain a rock-solid,
 * native app-like user experience.
 */
export const DisableZoom: React.FC = () => {
  useEffect(() => {
    // 1. Prevent iOS Safari pinch gesture (gesturestart, gesturechange, gestureend)
    const handleGesture = (e: Event) => {
      e.preventDefault();
    };

    // 2. Prevent multi-touch pinch to zoom (touchmove with 2 or more touch points)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // 3. Prevent double-tap to zoom (fast sequential taps within 300ms)
    let lastTouchEnd = 0;
    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        // Prevent default only if target is not an interactive input/button
        const target = e.target as HTMLElement | null;
        const isInteractive = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT');
        if (!isInteractive) {
          e.preventDefault();
        }
      }
      lastTouchEnd = now;
    };

    // 4. Prevent Ctrl + wheel / trackpad pinch zoom
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    // 5. Prevent keyboard zoom shortcuts (Ctrl/Cmd + '+', '-', '0', '=')
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0' || e.key === '_' || e.code === 'NumpadAdd' || e.code === 'NumpadSubtract')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('gesturestart', handleGesture, { passive: false });
    document.addEventListener('gesturechange', handleGesture, { passive: false });
    document.addEventListener('gestureend', handleGesture, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('gesturestart', handleGesture);
      document.removeEventListener('gesturechange', handleGesture);
      document.removeEventListener('gestureend', handleGesture);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
};
