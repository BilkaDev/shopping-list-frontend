import { ProductInterface } from '../../../types';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface SelectProductCategoryProps {
  initialValue?: number;
  register: UseFormRegisterReturn<'category'>;
}

export interface ImageUploadProps {
  setImage: (image: File) => void;
  setIsValid: (value: boolean) => void;
  defaultImage: string;
  image: string;
}

export interface EditItemFormProps {
  element: string;
  itemId: string;
  recipeId?: string;
  initialInputs: {
    name: string;
    category?: number;
    weight?: number;
    count?: number;
  };
}

export interface SearchProductProps {
  name: string;
  product: ProductInterface | undefined;
  register: UseFormRegisterReturn<'category'>;
  setProduct: (product: ProductInterface | undefined) => void;
}

export interface EditItemFormInputs {
  name: string;
  category: number;
  weight: number;
  count: number;
}
