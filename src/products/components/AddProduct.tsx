import { useHttpClient } from '../../common/hooks/http-hook';
import { LoadingSpinner } from '../../common/components/UiElements/LoadingSpinner';
import { InfoModal } from '../../common/components/UiElements/modals/InfoModal';
import { Button, VStack } from '@chakra-ui/react';
import { SuccessfullyBox } from '../../common/components/UiElements/SuccessfullyBox';
import * as Yup from 'yup';
import { ManageProductForm } from './ManageProductForm';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { AddProductFormInputs } from '../products.types';
import { useAppDispatch } from '../../common/Redux/store';
import { addProductFetch } from '../../common/Redux/fetch-services/products';

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
        'Adding a product failed, check the product name (name must not repeat)',
    });
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AddProductFormInputs>({
    resolver: yupResolver(AddProductSchema),
  });

  const createProduct = (values: AddProductFormInputs) => {
    dispatch(
      addProductFetch(
        {
          name: values.name,
          category: values.category,
        },
        sendRequest
      )
    );
    reset();
  };

  if (isSuccess) {
    return (
      <SuccessfullyBox
        text="Adding the product was successful."
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
          <VStack spacing={4} align="flex-start">
            <ManageProductForm register={register} errors={errors} />
            <Button
              type="submit"
              disabled={!isValid}
              colorScheme="gray"
              color="var(--dark)"
            >
              Add product
            </Button>
          </VStack>
        </form>
      )}
    </>
  );
};
