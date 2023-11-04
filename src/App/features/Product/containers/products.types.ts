import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { ProductCategory } from '@/types';

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
