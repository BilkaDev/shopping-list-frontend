import { ProductCategory } from 'interfaces';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface ProductsItemsProps {
  name: string;
  category: ProductCategory;
  id: string;
}

export interface ManageProductFormProps {
  register: UseFormRegister<AddProductFormInputs>;
  errors: FieldErrors<AddProductFormInputs>;
}

export interface AddProductFormInputs {
  name: string;
  category: number;
}
