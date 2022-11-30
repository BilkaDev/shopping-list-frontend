import { useState } from 'react';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { useDispatch } from 'react-redux';
import { SearchProduct } from './SearchProduct';
import { useParams } from 'react-router-dom';
import {
  CreateProductRequest,
  CreateItemInListRequest,
  AddItemToListResponse,
  AddProductResponse,
  ProductInterface,
  ItemInListInterface,
} from 'interfaces';
import { addProductAction } from '../../../common/Redux/actions/product';
import { addItemToList } from '../../../common/Redux/actions/list';
import { Button, VStack } from '@chakra-ui/react';
import { InfoModal } from '../../../common/components/UiElements/InfoModal';
import { LoadingSpinner } from '../../../common/components/UiElements/LoadingSpinner';
import { SuccessfullyBox } from '../../../common/components/UiElements/SuccessfullyBox';
import { addItemToRecipeAction } from '../../../common/Redux/actions/Recipe';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { InputForm } from '../../../common/components/UiElements/InputForm';
import { AddItemFormInputs, AddItemProps } from '../../lists.types';

const AddItemSchema = Yup.object().shape({
  name: Yup.string()
    .required('Product name is required!')
    .min(2, 'Product name is too short! minimum length is 2 characters!')
    .max(100, 'Product is too long! Maximum length is 100 characters!'),
  count: Yup.number().min(0).max(1000, 'Maximum quantity 1000'),
  weight: Yup.number().min(0).max(1000000, 'Maximum weight 1000000'),
});

export const AddItem = ({ isRecipe }: AddItemProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<AddItemFormInputs>({
    defaultValues: {
      count: 0,
      weight: 0,
    },
    resolver: yupResolver(AddItemSchema),
  });
  const [product, setProduct] = useState<ProductInterface>();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const dispatch = useDispatch();
  const { id } = useParams();

  const addItemToListRequest = async (values: AddItemFormInputs) => {
    let newProduct: ProductInterface | undefined = undefined;
    let newItem: CreateItemInListRequest | undefined = undefined;
    if (!product) {
      const newProductReq: CreateProductRequest = {
        name: values.name,
        category: Number(values.category),
      };
      const dataProduct = await sendRequest<AddProductResponse>(
        '/product',
        'POST',
        newProductReq
      );
      if (!dataProduct) {
        return;
      }
      newProduct = {
        ...newProductReq,
        id: dataProduct.product.id,
      };
      dispatch(addProductAction(newProduct));
      newItem = {
        itemId: dataProduct.product.id,
        count: Number(values.count),
        weight: Number(values.weight),
        listId: isRecipe ? undefined : id,
        recipeId: isRecipe ? id : undefined,
      };
    } else {
      newItem = {
        itemId: product.id,
        count: Number(values.count),
        weight: Number(values.weight),
        listId: isRecipe ? undefined : id,
        recipeId: isRecipe ? id : undefined,
      };
    }

    const data = await sendRequest<AddItemToListResponse>(
      '/list/item',
      'POST',
      newItem
    );

    if (!data) {
      return;
    }

    const newItemToStore: ItemInListInterface = {
      id: data.id,
      ...newItem,
      itemInBasket: false,
      recipeId: isRecipe ? id : undefined,
      product: (product || newProduct) as ProductInterface,
    };

    isRecipe
      ? dispatch(addItemToRecipeAction(newItemToStore))
      : dispatch(addItemToList(newItemToStore));
    setIsSuccess(true);
    reset();
  };

  function exitErrorHandler() {
    reset();
    clearError();
  }

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
          isError
          onClose={exitErrorHandler}
          title={'Failed!'}
        />
      )}
      {isLoading && <LoadingSpinner />}
      {!isLoading && !error && (
        <form onSubmit={handleSubmit(addItemToListRequest)}>
          <VStack spacing={4} align="flex-start">
            <InputForm
              register={register('name')}
              label="Name:"
              autoCompleteOff
              placeholder="Product name"
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
              label="Count:"
              placeholder="Count"
              type="number"
              errors={errors}
            />
            <InputForm
              register={register('weight')}
              label="Weight:"
              placeholder="Weight"
              type="number"
              errors={errors}
            />
            <Button
              type="submit"
              disabled={!isValid}
              colorScheme="gray"
              color="var(--dark)"
            >
              Add to list
            </Button>
          </VStack>
        </form>
      )}
    </>
  );
};
