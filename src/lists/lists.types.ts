import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { EditItemFormInputs } from '../common/components/FormElements/FormElementsTypes';

export interface ManageListProps {
  register: UseFormRegister<EditItemFormInputs>;
  errors: FieldErrors<EditItemFormInputs>;
}

export interface ManageItemInListProps {
  register: UseFormRegister<EditItemFormInputs>;
  errors: FieldErrors<EditItemFormInputs>;
}
