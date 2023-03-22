import { SelectProductCategory } from '../../common/components/FormElements/SelectProductCategory';
import { ManageProductFormProps } from '../products.types';
import { InputForm } from '../../common/components/UiElements/InputForm';

export const ManageProductForm = ({
  register,
  errors,
}: ManageProductFormProps) => {
  return (
    <>
      <InputForm
        register={register('name')}
        label="Name:"
        placeholder="Product name"
        errors={errors}
      />
      <SelectProductCategory register={register('category')} />
    </>
  );
};
