import { SelectProductCategory } from '../../../common/components/FormElements/SelectProductCategory';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { ManageItemInListProps } from '../../lists.types';

export const ManageItemInList = ({
  register,
  errors,
}: ManageItemInListProps) => {
  return (
    <>
      <FormControl isInvalid={!!errors.count}>
        <FormLabel fontSize="1.6rem">Count:</FormLabel>
        <Input
          {...register('count')}
          placeholder="Count:"
          type="number"
          variant="filled"
          bgColor="#292A2B"
          color="#DADADA"
        />
        <FormErrorMessage>
          {errors.count && errors.count.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.weight}>
        <FormLabel fontSize="1.6rem">Weight:</FormLabel>
        <Input
          {...register('weight')}
          placeholder="Weight in grams:"
          type="number"
          variant="filled"
          bgColor="#292A2B"
          color="#DADADA"
        />
        <FormErrorMessage>
          {errors.weight && errors.weight.message}
        </FormErrorMessage>
      </FormControl>
      <SelectProductCategory register={register('category')} />
    </>
  );
};
