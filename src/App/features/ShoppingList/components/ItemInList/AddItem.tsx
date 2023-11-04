import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, VStack } from '@chakra-ui/react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';

import { useHttpClient } from '@/App/shared/utils/http-hook';
import {
  CreateProductRequest,
  CreateItemInListRequest,
  ProductInterface,
} from '@/types';
import { InfoModal, LoadingSpinner, SuccessfullyBox } from '@/App/shared/ui/Page';
import { InputForm } from '@/App/shared/ui/Input';
import { useAppDispatch } from '@/Redux/store';
import { addProductFetch } from '@/Redux/fetch-services/products';
import { addItemToStoreFetch } from '@/Redux/fetch-services/common';

import { AddItemFormInputs, AddItemProps } from '../../containers/lists.types';
import { SearchProduct } from './SearchProduct';

const AddItemSchema = Yup.object().shape({
  name: Yup.string()
    .required('Product name is required!')
    .min(2, 'Product name is too short! minimum length is 2 characters!')
    .max(100, 'Product is too long! Maximum length is 100 characters!'),
  count: Yup.number().min(0).max(1000, 'Maximum quantity 1000').transform((currentValue) => isNaN(currentValue) ? 0 : currentValue),
  weight: Yup.number().min(0).max(1000000, 'Maximum weight 1000000').transform((currentValue) => isNaN(currentValue) ? 0 : currentValue),
});

export const AddItem = ({ isRecipe }: AddItemProps) => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<AddItemFormInputs>({
    defaultValues: {
      count: 0,
      weight: 0,
    },
    resolver: yupResolver(AddItemSchema),
  });
  const [product, setProduct] = useState<ProductInterface>();
  const { isLoading, isSuccess, setIsSuccess, sendRequest, error, clearError } =
    useHttpClient();
  const dispatch = useAppDispatch();
  const { id: listId } = useParams();

  const addItemToListRequest = async (values: AddItemFormInputs) => {
    let newProduct: ProductInterface | undefined = product;
    const newItem: CreateItemInListRequest = {
      itemId: product?.id ?? '',
      count: Number(values.count),
      weight: Number(values.weight),
      listId: isRecipe ? undefined : listId,
      recipeId: isRecipe ? listId : undefined,
    };
    if (!newProduct) {
      const newProductReq: CreateProductRequest = {
        name: values.name,
        category: Number(values.category),
      };
      const dataProduct = await dispatch(
        addProductFetch(newProductReq, sendRequest),
      );
      if (!dataProduct) return;
      newItem.itemId = dataProduct.id;
      newProduct = dataProduct;
    }
    dispatch(addItemToStoreFetch(newItem, newProduct, sendRequest, isRecipe));
    reset();
  };

  function exitErrorHandler() {
    reset();
    clearError();
  }

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
          onClose={exitErrorHandler}
          title={'Failed!'}
          isError
        />
      )}
      {isLoading && <LoadingSpinner />}
      {!isLoading && !error && (
        <form onSubmit={handleSubmit(addItemToListRequest)}>
          <VStack  width={300} spacing={4} align='flex-start'>
            <InputForm
              register={register('name')}
              label='Name:'
              autoComplete='off'
              placeholder='Product name'
              onChange={(e) => {
                register('name').onChange(e).then(() => trigger());
              }}
              errors={errors}
            />
            {watch('name')?.length > 1 && (
              <SearchProduct
                product={product}
                setProduct={setProduct}
                register={register('category')}
                name={watch('name')}
              />
            )}
            <InputForm
              register={register('count')}
              label='Count:'
              placeholder='Count'
              type='number'
              errors={errors}
            />
            <InputForm
              register={register('weight')}
              label='Weight:'
              placeholder='Weight'
              type='number'
              errors={errors}
            />
            <Button
              type='submit'
              disabled={isLoading}
              colorScheme='gray'
              color='var(--dark)'
            >
              Add to list
            </Button>
          </VStack>
        </form>
      )}
    </>
  );
};
