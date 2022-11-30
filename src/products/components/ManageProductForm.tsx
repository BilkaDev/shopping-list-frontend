import { SelectProductCategory } from '../../common/components/FormElements/SelectProductCategory';
import { ManageProductFormProps } from '../products.types';
import { ManageNameForm } from '../../common/components/FormElements/ManageNameForm';

export const ManageProductForm = ({
  register,
  errors,
}: ManageProductFormProps) => {
  return (
    <>
      <ManageNameForm
        register={register('name')}
        placeholder="Product name"
        errors={errors}
      />
      <SelectProductCategory register={register('category')} />
    </>
  );
};
