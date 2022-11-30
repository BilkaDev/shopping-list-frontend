import { SelectProductCategory } from '../../../common/components/FormElements/SelectProductCategory';
import { ManageItemInListProps } from '../../lists.types';
import { InputForm } from '../../../common/components/UiElements/InputForm';

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
