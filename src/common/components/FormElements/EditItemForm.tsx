import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHttpClient } from '../../hooks/http-hook';
import {
  CreateListRequest,
  UpdateProductRequest,
  UpdateItemInListRequest,
  EditRecipeRequest,
} from 'interfaces';
import { editItemInList, editListName } from '../../Redux/actions/list';
import { ManageList } from '../../../lists/components/List/ManageList';
import { editProductAction } from '../../Redux/actions/product';
import { ManageProductForm } from '../../../products/components/ManageProductForm';
import { Button } from '@chakra-ui/react';
import { InfoModal } from '../UiElements/InfoModal';
import { ManageItemInList } from '../../../lists/components/ItemInList/ManageItemInList';
import {
  editItemInRecipeAction,
  editRecipeAction,
} from '../../Redux/actions/Recipe';
import * as Yup from 'yup';
import { AddProductFormInputs } from '../../../products/products.types';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm, UseFormRegister } from 'react-hook-form';
import { EditItemFormInputs, EditItemFormProps } from './FormElementsTypes';

export const EditItemForm = ({
  itemId,
  initialInputs,
  element,
  recipeId,
}: EditItemFormProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, error, sendRequest, clearError } = useHttpClient({
    '400': "Ops. something went wrong.... check the name (can't be repeated)",
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
    ]
  );
  const EditItemFormSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required!')
      .min(2, 'Name is too short! minimum length is 2 characters!')
      .max(100, 'Name is too long! Maximum length is 100 characters!')
      .test('initial-value', 'is initial value', (v, c) => {
        console.log(initialInputsForm.weight);
        return (
          v !== initialInputsForm.name ||
          c.parent.weight !== initialInputsForm.weight ||
          c.parent.count !== initialInputsForm.count ||
          c.parent.category !== initialInputsForm.category
        );
      }),
    count: Yup.number().min(0).max(1000, 'Maximum quantity 1000'),
    weight: Yup.number().min(0).max(1000000, 'Maximum weight 1000000'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EditItemFormInputs>({
    defaultValues: initialInputsForm,
    resolver: yupResolver(EditItemFormSchema),
  });

  const submitHandler = async (values: EditItemFormInputs) => {
    let editItem:
      | CreateListRequest
      | UpdateProductRequest
      | UpdateItemInListRequest
      | EditRecipeRequest
      | undefined = undefined;
    let path = '';

    switch (element) {
      case 'list':
        editItem = {
          listName: values.name,
        };
        path = `/list/${itemId}`;
        dispatch(editListName(itemId, editItem as CreateListRequest));
        break;
      case 'recipe':
        editItem = {
          name: values.name,
          id: itemId,
        };
        path = `/recipe/edit`;
        dispatch(editRecipeAction(editItem as EditRecipeRequest));
        break;
      case 'product':
        path = `/product/${itemId}`;
        editItem = {
          name: values.name,
          category: Number(values.category),
        };
        dispatch(editProductAction(itemId, editItem as UpdateProductRequest));
        break;
      case 'itemInList':
        path = `/list/item/${itemId}`;
        editItem = {
          count: Number(values.count),
          weight: Number(values.weight),
          category: Number(values.category),
        };
        dispatch(editItemInList(itemId, editItem as UpdateItemInListRequest));
        break;
      case 'itemInRecipe':
        path = `/list/item/${itemId}`;
        editItem = {
          count: Number(values.count),
          weight: Number(values.weight),
          category: Number(values.category),
        };
        dispatch(
          editItemInRecipeAction(
            itemId,
            recipeId as string,
            editItem as UpdateItemInListRequest
          )
        );
        break;
      default:
        return;
    }
    const data = await sendRequest(path, 'PATCH', editItem);
    if (data) {
      setIsSuccess(true);
    }
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
          isError
          message={error}
          onClose={clearError}
          title={'Failed!'}
        />
      )}
      {!isLoading && !error && (
        <form onSubmit={handleSubmit(submitHandler)}>
          {(element === 'list' || element === 'recipe') && (
            <ManageList register={register} errors={errors} />
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
          <Button disabled={!isValid} type="submit" colorScheme="blue">
            Update!
          </Button>
        </form>
      )}
    </>
  );
};
