'use client';

import React from 'react';
import { MenuItem } from '@/data/menuData';
import { DishCard } from './DishCard';

export interface MenuGridProps {
  dishes: MenuItem[];
}

export const MenuGrid: React.FC<MenuGridProps> = ({ dishes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dishes.map((dish, index) => (
        <DishCard
          key={dish.id || `dish-${index}`}
          item={dish}
        />
      ))}
    </div>
  );
};
