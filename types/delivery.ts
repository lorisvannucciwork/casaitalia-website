import type { MenuItem } from './menu';

export interface DeliveryCartItem {
  dish: MenuItem;
  quantity: number;
  notes?: string;
}

export type DeliveryArea = 'inside' | 'outside';

export interface DeliveryCustomerDetails {
  customerName: string;
  area: DeliveryArea;
  destination?: string;
  specificLocation: string; // Room, villa, or specific location
  phone: string;
  notes?: string;
}
