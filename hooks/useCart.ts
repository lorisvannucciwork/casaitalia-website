'use client';

import { useState, useEffect } from 'react';
import { OrderItem } from '../components/OrderDraftDrawer';

export function useCart() {
  const [orderItems, setOrderItemsState] = useState<OrderItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on initial client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('casaItaliaCart');
      if (stored) {
        setOrderItemsState(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever orderItems change (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('casaItaliaCart', JSON.stringify(orderItems));
      } catch (error) {
        console.error('Failed to save cart to localStorage', error);
      }
    }
  }, [orderItems, isLoaded]);

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'casaItaliaCart' && e.newValue) {
        setOrderItemsState(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setOrderItems = (items: OrderItem[] | ((prev: OrderItem[]) => OrderItem[])) => {
    setOrderItemsState(items);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setOrderItems((prev) =>
      prev
        .map((item) => {
          if (cartId === item.cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setOrderItems((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const handleUpdateNote = (cartId: string, note: string) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        cartId === item.cartId ? { ...item, specialNotes: note } : item
      )
    );
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  const handleAddItem = (newItem: OrderItem) => {
    setOrderItems((prev) => [...prev, newItem]);
  };

  return {
    orderItems,
    setOrderItems,
    handleUpdateQuantity,
    handleRemoveItem,
    handleUpdateNote,
    handleClearOrder,
    handleAddItem,
    isLoaded,
  };
}
