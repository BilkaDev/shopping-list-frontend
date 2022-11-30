import {
  FieldErrors,
  UseFormRegister,
  UseFormRegisterReturn,
} from 'react-hook-form';
import { EditItemFormInputs } from '../common/components/FormElements/FormElementsTypes';

export interface ManageListProps {
  errors: FieldErrors<EditItemFormInputs>;
  register: UseFormRegisterReturn<'name'>;
}

export interface ManageItemInListProps {
  register: UseFormRegister<EditItemFormInputs>;
  errors: FieldErrors<EditItemFormInputs>;
}

export interface AddListFormInterface {
  name: string;
}
