import {
  FieldErrors,
  UseFormRegister,
  UseFormRegisterReturn,
} from 'react-hook-form';
import { EditItemFormInputs } from '../common/components/FormElements/FormElementsTypes';

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

export interface AddListFormInterface {
  name: string;
}
export interface AddItemFormInterface {
  name: string;
  count: number;
  weight: number;
  category: number;
}
