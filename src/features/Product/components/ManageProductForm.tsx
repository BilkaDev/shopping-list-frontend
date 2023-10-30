import { SelectProductCategory } from '@/common/components/FormElements/SelectProductCategory';
import { InputForm } from '@/shared/ui/Input';

import { ManageProductFormProps } from '../products.types';

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
