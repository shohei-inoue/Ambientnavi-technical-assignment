export type CategoryData = {
  id: number;
  name: string;
};

export type TagData = {
  id: number;
  name: string;
  color?: string | null;
};

export type MenuData = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  taxIncluded: boolean;
  tags: TagData[];
  categories: CategoryData[];
};

/* ----- admin ----- */
// カテゴリー
export type AdminCategoriesData = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    menus: number;
  };
};

export type AdminCategoryData = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

// メニュー
export type AdminMenuData = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  taxIncluded: boolean;
  tags: AdminTagData[];
  categories: AdminCategoryData[];
};

export type AdminTagData = {
  id: number;
  name: string;
  color?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
