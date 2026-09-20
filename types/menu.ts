export type CategoryId = string;

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  image: string;
  italianName: string;
  pronunciation?: string;
  tags: string[];
  badge?: string;
  calories?: number;
  preparationTime?: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  italianTitle: string;
  description: string;
  iconName?: string;
}

export interface TranslatedMenuFields {
  name: string;
  description: string;
  italianName: string;
}
