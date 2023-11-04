import { SelectProductCategory } from '@/App/components/SelectProductCategory';
import { InputForm } from '@/App/shared/ui/Input';

import { ManageItemInListProps } from '../../containers/lists.types';

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
