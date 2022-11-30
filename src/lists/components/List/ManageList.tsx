import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { ManageListProps } from '../../lists.types';

export const ManageList = ({ register, errors }: ManageListProps) => {
  return (
    <>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel fontSize="1.6rem">Name:</FormLabel>
        <Input
          {...register}
          placeholder="List name"
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
