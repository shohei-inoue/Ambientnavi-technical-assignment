export type Menu = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
  taxIncluded: boolean;
  createdAt: Date;
  updatedAt: Date;
  subCategory: MenuSubCategory;
  tags: MenuTag[];
};

export type MenuTag = {
  id: number;
  name: string;
  color: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type MenuSubCategory = {
  id: number;
  name: string;
};
