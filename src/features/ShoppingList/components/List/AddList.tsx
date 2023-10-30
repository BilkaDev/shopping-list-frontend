import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { useHttpClient } from '@/common/hooks/http-hook';
import { InfoModal, LoadingSpinner, SuccessfullyBox } from '@/shared/ui/Page';
import { InputForm } from '@/shared/ui/Input';
import { useAppDispatch } from '@/common/Redux/store';
import { addListFetch } from '@/common/Redux/fetch-services/list';

import { AddListFormInputs } from '../../lists.types';

const AddListSchema = Yup.object().shape({
  name: Yup.string()
    .required('List name is required!')
    .min(2, 'List name is too short! minimum length is 2 characters!')
    .max(100, 'List is too long! Maximum length is 100 characters!'),
});

export const AddList = () => {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm<AddListFormInputs>({
    resolver: yupResolver(AddListSchema),
  });
  const { isLoading, isSuccess, setIsSuccess, sendRequest, error, clearError } =
    useHttpClient({
      400: 'Adding the ShoppingList failed, check the Recipe name (the name must not repeat)',
    });
  const dispatch = useAppDispatch();

  const addListToLists = async (values: AddListFormInputs) => {
    const list = {
      listName: values.name,
    };
    dispatch(addListFetch(list, sendRequest));
    reset();
  };


  if (isSuccess) {
    return (
      <SuccessfullyBox
        text='Adding the list was successful.'
        setIsSuccess={setIsSuccess}
      />
    );
  }

  const { onChange } = register('name');
  return (
    <>
      {error && (
        <InfoModal
          message={error}
          onClose={clearError}
          title={'Failed!'}
          isError
        />
      )}
      {isLoading && <LoadingSpinner />}
      {!isLoading && !error && (
        <form onSubmit={handleSubmit(addListToLists)}>
          <VStack spacing={4} align='flex-start'>
            <InputForm
              register={register('name')}
              label='Name:'
              placeholder='List name'
              onChange={(e) => onChange(e).then(() => trigger())}
              errors={errors}
            />
            <Button
              type='submit'
              disabled={!isValid}
              colorScheme='gray'
              color='var(--dark)'
            >
              Add
            </Button>
          </VStack>
        </form>
      )}
    </>
  );
};
