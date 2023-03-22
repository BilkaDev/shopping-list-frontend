import { ItemInListInterface, RecipeInterface } from 'interfaces';

export interface RecipeItemProps {
  id: string;
  name: string;
}

export interface DescriptionManageProps {
  show: boolean;
  onClose: any;
  description?: string;
  id: string;
}

export interface ItemInRecipeProps {
  category: number;
  item: ItemInListInterface;
  recipeId: string;
}

export interface ItemsListRecipeProps {
  categoryName: string;
  categoryId: number;
  recipe: RecipeInterface;
}

export interface AddRecipeFormInputs {
  name: string;
}
