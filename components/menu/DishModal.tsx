'use client';

import React from 'react';

export interface DishModalProps {
  dish?: unknown;
  onClose?: () => void;
}

/**
 * DishModal has been removed per design request.
 */
export const DishModal: React.FC<DishModalProps> = () => null;
