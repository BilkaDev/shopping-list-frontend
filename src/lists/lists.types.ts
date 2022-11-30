import {
  ItemInListInterface,
  ListInterface,
  RecipeInterface,
} from 'interfaces';
import {
  FieldErrors,
  UseFormRegister,
  UseFormRegisterReturn,
} from 'react-hook-form';
import { EditItemFormInputs } from '../common/components/FormElements/FormElements.types';

export interface ManageNameProps {
  register: UseFormRegisterReturn<'name'>;
  placeholder?: string;
  errors: FieldErrors<EditItemFormInputs>;
}

export interface ManageItemInListProps {
  register: UseFormRegister<EditItemFormInputs>;
  errors: FieldErrors<EditItemFormInputs>;
}

export interface AddItemProps {
  isRecipe?: boolean;
}

export interface ListItemProps {
  id: string;
  name: string;
}

export interface ItemInListProps {
  category: number;
  item: ItemInListInterface;
  isRecipe?: boolean;
}

export interface ItemsListProps {
  categoryName: string;
  categoryId: number;
  list: ListInterface | RecipeInterface;
  isRecipe?: boolean;
}

export interface ItemsInRecipesListProps {
  recipes: RecipeInterface[];
  category: string[];
  listId: string;
}

export interface AddListFormInputs {
  name: string;
}

export interface AddItemFormInputs {
  name: string;
  count: number;
  weight: number;
  category: number;
}
