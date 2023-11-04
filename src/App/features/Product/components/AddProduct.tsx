import * as Yup from 'yup';
import { Button, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';

import { InfoModal } from '@/App/shared/ui/Page/Modal/InfoModal';
import { useHttpClient } from '@/App/shared/utils/http-hook';
import { LoadingSpinner, SuccessfullyBox } from '@/App/shared/ui/Page';
import { addProductFetch } from '@/Redux/fetch-services/products';
import { useAppDispatch } from '@/Redux/store';

import { ManageProductForm } from './ManageProductForm';
import { AddProductFormInputs } from '../containers/products.types';

const AddProductSchema = Yup.object().shape({
  name: Yup.string()
    .required('Product name is required!')
    .min(2, 'Product name is too short! minimum length is 2 characters!')
    .max(100, 'Product is too long! Maximum length is 100 characters!'),
});

export const AddProduct = () => {
  const { isLoading, isSuccess, setIsSuccess, sendRequest, error, clearError } =
    useHttpClient({
      '400':
        'Adding a Product failed, check the Product name (name must not repeat)',
    });
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProductFormInputs>({
    resolver: yupResolver(AddProductSchema),
  });

  const createProduct = (values: AddProductFormInputs) => {
    dispatch(
      addProductFetch(
        {
          name: values.name,
          category: Number(values.category),
        },
        sendRequest,
      ),
    );
    reset();
  };

  if (isSuccess) {
    return (
      <SuccessfullyBox
        text='Adding the product was successful.'
        setIsSuccess={setIsSuccess}
      />
    );
  }

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
        <form onSubmit={handleSubmit(createProduct)}>
          <VStack spacing={4} align='flex-start'>
            <ManageProductForm register={register} errors={errors} />
            <Button
              type='submit'
              disabled={isLoading}
              colorScheme='gray'
              color='var(--dark)'
            >
              Add product
            </Button>
          </VStack>
        </form>
      )}
    </>
  );
};
