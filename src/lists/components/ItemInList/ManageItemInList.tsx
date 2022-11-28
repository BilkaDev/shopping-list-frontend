import { SelectProductCategory } from '../../../common/components/FormElements/SelectProductCategory';
import { Input } from '../../../common/components/FormElements/Input';
import { VALIDATOR_MAX, VALIDATOR_MIN } from '../../../common/utils/validators';

interface Props {
  inputHandler: (id: string, value: string, isValid: boolean) => void;
  selectHandler: (id: string, value: number, isValid: boolean) => void;
  initialValue: {
    product: string;
    category: number;
    count: number;
    weight: number;
  };
}

export const ManageItemInList = ({
  initialValue: { category, count, weight },
  inputHandler,
  selectHandler,
}: Props) => {
  return (
    <>
      <Input
        label="Count"
        id="count"
        placeholder="Count:"
        errorText="Maximum quantity 1000"
        validators={[VALIDATOR_MAX(1000), VALIDATOR_MIN(0)]}
        initialValue={count + ''}
        initialValid={true}
        onInput={inputHandler}
        type="number"
        min="0"
        max="1000"
      />
      <Input
        label="Weight"
        id="weight"
        placeholder="Weight in grams"
        errorText="Maximum weight 1000000"
        validators={[VALIDATOR_MAX(1000000), VALIDATOR_MIN(0)]}
        onInput={inputHandler}
        initialValid={true}
        initialValue={weight + ''}
        type="number"
        min="0"
        max="1000000"
      />
      <SelectProductCategory onInput={selectHandler} initialValue={category} />
    </>
  );
};
