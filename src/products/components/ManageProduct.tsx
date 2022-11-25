import React from 'react';
import { Input } from '../../common/components/FormElements/Input';
import { SelectProductCategory } from '../../common/components/FormElements/SelectProductCategory';
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from '../../common/utils/validators';

interface Props {
  inputHandler: (id: string, value: string, isValid: boolean) => void;
  selectHandler: (id: string, value: number, isValid: boolean) => void;
  initialValue?: { product: string; category: number };
  initialValid?: boolean;
}

export const ManageProduct = (props: Props) => {
  const { inputHandler, selectHandler, initialValid, initialValue } = props;
  return (
    <>
      <Input
        label="Name"
        id="name"
        placeholder="Product name"
        errorText="Product name is required (min. 2 characters max. 100)."
        validators={[VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(100)]}
        onInput={inputHandler}
        initialValid={initialValid}
        initialValue={initialValue?.product}
      />
      <SelectProductCategory
        onInput={selectHandler}
        initialValue={initialValue?.category}
      />
    </>
  );
};
