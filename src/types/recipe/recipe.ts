import {ItemInListInterface} from "../list";


export interface RecipeInterface {
  id: string;
  name: string;
  description: string;
  items: ItemInListInterface[];
}

export type RecipeFilter = Omit<RecipeInterface, "description" | "items">;

export type CreateRecipeResponse = { id: string };

export type EditNameRecipeResponse = { message: string };

export type AddRecipeRequest = {
  name: string;
  userId: string;
  description: string;
  items?: ItemInListInterface[];
};
export type EditRecipeRequest = {
  name: string;
  id: string;
};
export type EditDescriptionRecipeRequest = {
  description: string;
  id: string;
};

export type DeleteRecipeResponse = EditNameRecipeResponse;
export type GetRecipesResponse = {
  recipes: RecipeFilter[];
};
export type GetRecipeResponse = {
  recipe: RecipeInterface;
};
