import { ProductCategory } from 'interfaces';
import { Select } from '../UiElements/Select';
import { SelectProductCategoryProps } from './FormElementsTypes';

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
    <label>
      <p>Category:</p>
      <Select register={register}>{category}</Select>
    </label>
  );
};
