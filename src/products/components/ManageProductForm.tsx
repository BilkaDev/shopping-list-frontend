import { SelectProductCategory } from '../../common/components/FormElements/SelectProductCategory';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { ManageProductFormProps } from '../products.types';

export const ManageProductForm = ({
  register,
  errors,
}: ManageProductFormProps) => {
  return (
    <>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel fontSize="1.6rem">Name:</FormLabel>
        <Input
          {...register('name')}
          width="25rem"
          placeholder="Product name"
          variant="filled"
          bgColor="#292A2B"
          color="#DADADA"
        ></Input>
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <SelectProductCategory register={register('category')} />
    </>
  );
};
