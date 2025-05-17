// カテゴリー
export type CategoriesData = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    menus: number;
  };
};

export type categoryData = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

// メニュー
export type MenuData = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  taxIncluded: boolean;
  tags: TagData[];
  categories: categoryData[];
};

export type TagData = {
  id: number;
  name: string;
  color?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
