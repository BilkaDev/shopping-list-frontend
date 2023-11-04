import { FormControl, FormLabel } from '@chakra-ui/react';

import { ProductCategory } from '@/types';
import { Select } from '@/App/shared/ui/Select';

import { UseFormRegisterReturn } from 'react-hook-form';

interface SelectProductCategoryProps {
  initialValue?: number;
  register: UseFormRegisterReturn<'category'>;
}

export const SelectProductCategory = ({
                                        register,
                                      }: SelectProductCategoryProps) => {
  const entries = Object.entries(ProductCategory);
  const category = [];
  for (const key of entries) {
    if (typeof key[1] === 'number') {
      const option = (
        <option key={key[1]} value={key[1]}>
          {key[0]}
        </option>
      );
      category.push(option);
    }
  }

  return (
    <FormControl>
      <FormLabel fontSize='1.6rem'>Category:</FormLabel>
      <Select register={register}>{category}</Select>
    </FormControl>
  );
};
