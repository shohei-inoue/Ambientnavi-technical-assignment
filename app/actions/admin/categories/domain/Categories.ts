export type SubCategory = {
  id: number;
  name: string;
  menuCount: number;
};

export type Category = {
  id: number;
  name: string;
  subCategories: SubCategory[];
};
