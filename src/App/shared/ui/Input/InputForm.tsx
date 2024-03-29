import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import { InputFormProps } from '../UiElements.types';

export function InputForm({
                            register,
                            label,
                            placeholder,
                            type,
                            onChange,
                            autoComplete,
                            errors,
                            defaultValue,
                          }: InputFormProps) {
  return (
    <FormControl isInvalid={!!errors[register.name]}>
      {label && <FormLabel fontSize='1.6rem'>{label}</FormLabel>}
      <Input
        {...register}
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={type ?? 'string'}
        autoComplete={autoComplete}
        variant='filled'
        bgColor='#292A2B'
        color='#DADADA'
        onChange={onChange}
      />
      <FormErrorMessage>
        {errors[register.name] && errors[register.name]?.message}
      </FormErrorMessage>
    </FormControl>
  );
}
