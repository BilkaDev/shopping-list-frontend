import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { ManageListProps } from '../../../lists/lists.types';

export const ManageNameForm = ({
  register,
  placeholder,
  errors,
}: ManageListProps) => {
  return (
    <>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel fontSize="1.6rem">Name:</FormLabel>
        <Input
          {...register}
          placeholder={placeholder ?? 'List name'}
          variant="filled"
          bgColor="#292A2B"
          color="#DADADA"
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};
