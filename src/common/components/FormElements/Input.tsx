import { ChangeEvent, useEffect, useReducer } from 'react';
import { validate, Validator } from '../../utils/validators';
import {
  FormControl,
  FormErrorMessage,
  Input as ChakraInput,
} from '@chakra-ui/react';

interface Props {
  label: string;
  id: string;
  type?: string;
  elementName?: string;
  errorText?: string;
  placeholder?: string;
  onInput: (id: string, value: string, isValid: boolean) => void;
  validators: Validator[];
  initialValue?: string;
  initialValid?: boolean;
  min?: string;
  max?: string;
  autoCompleteOff?: boolean;
}

function inputReducer(state: any, action: any) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouch: true,
      };
    default:
      return state;
  }
}

export const Input = ({
  autoCompleteOff,
  errorText,
  id,
  initialValid,
  initialValue,
  label,
  max,
  min,
  onInput,
  placeholder,
  type,
  validators,
}: Props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isValid: initialValid || false,
    isTouch: false,
  });
  const { value, isValid, isTouch } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, isValid, value]);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'CHANGE',
      value: e.target.value,
      validators,
    });
  };

  function touchHandler() {
    dispatch({
      type: 'TOUCH',
    });
  }

  const element = (
    <ChakraInput
      width="25rem"
      min={min}
      max={max}
      autoComplete={autoCompleteOff ? 'off' : 'on'}
      onBlur={touchHandler}
      onChange={inputChangeHandler}
      type={type ? 'number' : 'text'}
      placeholder={placeholder}
      value={inputState.value}
      variant="filled"
      bgColor="#292A2B"
      color="#DADADA"
    />
  );
  return (
    <FormControl isInvalid={!isValid && isTouch}>
      <label
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p>{label}:</p>
        {element}
        <FormErrorMessage>{errorText}</FormErrorMessage>
      </label>
    </FormControl>
  );
};
