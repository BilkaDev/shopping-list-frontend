import { useMemo } from 'react';
import { Button } from '@chakra-ui/react';
import * as Yup from 'yup';
import { useForm, UseFormRegister } from 'react-hook-form';

import { ManageProductForm } from '@/App/features/Product/components/ManageProductForm';
import { ManageItemInList } from '@/App/features/ShoppingList/components/ItemInList/ManageItemInList';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { InfoModal } from '@/App/shared/ui/Page';
import { InputForm } from '@/App/shared/ui/Input';
import { AddProductFormInputs } from '@/App/features/Product/containers/products.types';
import { useAppDispatch } from '@/Redux/store';
import { useHttpClient } from '@/App/shared/utils/http-hook';
import { editItemFetch } from '@/Redux/fetch-services/common';
import { EditItemType } from '@/Redux/fetch-services/fetch.types';

import { EditItemFormInputs, EditItemFormProps } from './EditItemForm.types';

export const EditItemForm = ({
                               itemId,
                               initialInputs,
                               element,
                               recipeId,
                             }: EditItemFormProps) => {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, sendRequest, error, clearError } =
    useHttpClient({
      '400': 'Ops. something went wrong.... check the name (can\'t be repeated)',
    });

  const initialInputsForm = useMemo(
    () => ({
      name: initialInputs.name,
      category: initialInputs?.category || 0,
      weight: initialInputs?.weight || 0,
      count: initialInputs?.count || 0,
    }),
    [
      initialInputs?.category,
      initialInputs?.count,
      initialInputs.name,
      initialInputs?.weight,
    ],
  );
  const EditItemFormSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required!')
      .min(2, 'Name is too short! minimum length is 2 characters!')
      .max(100, 'Name is too long! Maximum length is 100 characters!')
      .test('initial-value', 'is initial value', (v, c) => {
        return (
          v !== initialInputsForm.name ||
          c.parent.weight !== initialInputsForm.weight ||
          c.parent.count !== initialInputsForm.count ||
          c.parent.category !== initialInputsForm.category
        );
      }),
    count: Yup.number().min(0).max(1000, 'Maximum quantity 1000').transform((currentValue) => isNaN(currentValue) ? 0 : currentValue)
    ,
    weight: Yup.number().min(0).max(1000000, 'Maximum weight 1000000').transform((currentValue) => isNaN(currentValue) ? 0 : currentValue),

  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditItemFormInputs>({
    defaultValues: initialInputsForm,
    resolver: yupResolver(EditItemFormSchema),
  });

  const submitHandler = async (values: EditItemFormInputs) => {
    let editItem: EditItemType;
    let path = '';

    switch (element) {
      case 'list':
        editItem = {
          listName: values.name,
        };
        path = `/list/${itemId}`;
        break;
      case 'recipe':
        editItem = {
          name: values.name,
          id: itemId,
        };
        path = `/recipe/edit`;
        break;
      case 'product':
        path = `/product/${itemId}`;
        editItem = {
          name: values.name,
          category: Number(values.category),
        };
        break;
      case 'itemInList':
        path = `/list/item/${itemId}`;
        editItem = {
          count: Number(values.count),
          weight: Number(values.weight),
          category: Number(values.category),
        };
        break;
      case 'itemInRecipe':
        path = `/list/item/${itemId}?Recipe`;
        editItem = {
          count: Number(values.count),
          weight: Number(values.weight),
          category: Number(values.category),
        };
        break;
      default:
        return;
    }
    dispatch(editItemFetch(itemId, path, editItem, sendRequest, recipeId));
  };
  if (isSuccess) {
    return (
      <>
        <p>Update "{initialInputs.name}" is success.</p>
      </>
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
      {!isLoading && !error && (
        <form onSubmit={handleSubmit(submitHandler)}>
          {(element === 'list' || element === 'recipe') && (
            <InputForm
              register={register('name')}
              label='Name:'
              placeholder='List name'
              errors={errors}
            />
          )}
          {element === 'product' && initialInputs.category !== undefined && (
            <ManageProductForm
              register={
                register as unknown as UseFormRegister<AddProductFormInputs>
              }
              errors={errors}
            />
          )}
          {(element === 'itemInList' || element === 'itemInRecipe') &&
            initialInputs.category !== undefined && (
              <ManageItemInList register={register} errors={errors} />
            )}
          <Button disabled={isLoading} type='submit' colorScheme='blue'>
            Update!
          </Button>
        </form>
      )}
    </>
  );
};
