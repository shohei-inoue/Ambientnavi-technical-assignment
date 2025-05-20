// カート
export type CartItemData = {
  id: number;
  menuId: number;
  menuName: string;
  menuPrice: number;
  quantity: number;
  note?: string;
};

export type CartData = {
  id: number;
  tableSessionId: number;
  items: CartItemData[];
  totalAmount: number;
  guestCount: number;
};

// 性別
export type Gender = "MALE" | "FEMALE" | "OTHER";

// カテゴリー
export type CategoryData = {
  id: number;
  name: string;
  subCategories: SubCategoryData[];
};

export type SubCategoryData = {
  id: number;
  name: string;
  category: CategoryData;
};

export type TagData = {
  id: number;
  name: string;
  color?: string | null;
};

// メニュー
export type MenuData = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  taxIncluded: boolean;
  tags: TagData[];
  subCategory: SubCategoryData;
};

/* ----- admin ----- */
// カテゴリー
export type AdminSubCategoryData = {
  id: number;
  name: string;
  _count: {
    menus: number;
  };
};

export type AdminCategoriesData = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  subCategories: AdminSubCategoryData[];
};

export type AdminCategoryData = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  subCategories: AdminSubCategoryData[];
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
  subCategory: AdminSubCategoryData;
};

export type AdminTagData = {
  id: number;
  name: string;
  color?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
