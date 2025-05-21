export type Tag = {
  id: number;
  name: string;
  color: string | null;
};

export type Category = {
  id: number;
  name: string;
  subCategories: SubCategory[];
};

export type SubCategory = {
  id: number;
  name: string;
  category: Category;
};

export type Menu = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  taxIncluded: boolean;
  subCategory: SubCategory;
  tags: Tag[];
};
