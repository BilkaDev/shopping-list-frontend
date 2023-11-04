import { SelectProductCategory } from '@/App/components/SelectProductCategory';
import { InputForm } from '@/App/shared/ui/Input';

import { ManageProductFormProps } from '../containers/products.types';

export const ManageProductForm = ({
                                    register,
                                    errors,
                                  }: ManageProductFormProps) => {
  return (
    <>
      <InputForm
        register={register('name')}
        label='Name:'
        placeholder='Product name'
        errors={errors}
      />
      <SelectProductCategory register={register('category')} />
    </>
  );
};
