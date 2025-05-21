export type CategoryData = {
  id: number;
  name: string;
  subCategories: SubCategoryData[];
};

export type SubCategoryData = {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
    subCategories: never[];
  };
};