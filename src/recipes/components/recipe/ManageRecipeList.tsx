import React from 'react';
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from '../../../common/utils/validators';
import { Input } from '../../../common/components/FormElements/Input';

interface Props {
  inputHandler: (id: string, value: string, isValid: boolean) => void;
  initialValue?: { name: string };
  initialValid?: boolean;
}

export const ManageRecipeList = (props: Props) => {
  const { inputHandler, initialValid, initialValue } = props;
  return (
    <>
      <Input
        label="Name"
        id="name"
        placeholder="Recipe name"
        errorText="Recipe name is required (min. 2 characters max. 100)."
        validators={[VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(100)]}
        onInput={inputHandler}
        initialValid={initialValid}
        initialValue={initialValue?.name}
      />
    </>
  );
};
