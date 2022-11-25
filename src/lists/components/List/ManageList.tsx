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

export const ManageList = (props: Props) => {
  const { inputHandler, initialValid, initialValue } = props;
  return (
    <>
      <Input
        label="Name"
        id="name"
        placeholder="List name"
        errorText="List name is required (min. 2 characters max. 100)."
        validators={[VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(100)]}
        onInput={inputHandler}
        initialValid={initialValid}
        initialValue={initialValue?.name}
      />
    </>
  );
};
