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
