import { SelectProductCategory } from '@/common/components/FormElements/SelectProductCategory';
import { InputForm } from '@/shared/ui/Input';

import { ManageItemInListProps } from '../../lists.types';

export const ManageItemInList = ({
  register,
  errors,
}: ManageItemInListProps) => {
  return (
    <>
      <InputForm
        register={register('count')}
        label="Count:"
        placeholder="Count"
        errors={errors}
      />
      <InputForm
        register={register('weight')}
        label="Weight:"
        placeholder="Weight"
        errors={errors}
      />
      <SelectProductCategory register={register('category')} />
    </>
  );
};
