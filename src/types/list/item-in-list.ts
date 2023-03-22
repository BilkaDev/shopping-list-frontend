import {ProductCategory, ProductInterface} from "../product";

export interface ItemInListInterface {
  id: string;
  product: ProductInterface;
  count: number;
  weight: number;
  itemInBasket: boolean;
  listId?: string;
  recipeId?: string;
}

export type AddItemToListResponse = {
  id: string;
};

export type DeleteItemInListResponse = {
  message: string;
};

export type CreateItemInListRequest = {
  listId?: string;
  recipeId?: string;
  itemId: string;
  count: number;
  weight: number;
};
export type UpdateItemInListRequest = {
  count: number;
  weight: number;
  category: ProductCategory;
};
