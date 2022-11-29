import { FormEvent, useEffect, useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useHttpClient } from '../../hooks/http-hook';
import { useForm } from '../../hooks/form-hook';
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
import { InfoModal } from './InfoModal';
import { ManageItemInList } from '../../../lists/components/ItemInList/ManageItemInList';
import {
  editItemInRecipeAction,
  editRecipeAction,
} from '../../Redux/actions/Recipe';

interface Props {
  element: string;
  itemId: string;
  recipeId?: string;
  initialValid: boolean;
  initialInputs: {
    name: string;
    category?: number;
    weight?: number;
    count?: number;
  };
}

export const EditItemForm = ({
  itemId,
  initialInputs,
  element,
  initialValid,
  recipeId,
}: Props) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const initialInputsForm = useMemo(
    () => ({
      name: {
        value: initialInputs.name,
        isValid: true,
      },
      category: {
        value: initialInputs?.category || 0,
        isValid: true,
      },
      weight: {
        value: initialInputs?.weight || 0,
        isValid: true,
      },
      count: {
        value: initialInputs?.count || 0,
        isValid: true,
      },
    }),
    [
      initialInputs?.category,
      initialInputs?.count,
      initialInputs.name,
      initialInputs?.weight,
    ]
  );
  const { formState, selectHandler, inputHandler, setFormData } = useForm(
    initialInputsForm,
    false
  );
  const { isLoading, error, sendRequest, clearError } = useHttpClient({
    '400': "Ops. something went wrong.... check the name (can't be repeated)",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData(initialInputsForm, initialValid);
    return () => clearError();
  }, [clearError, initialInputsForm, initialValid, setFormData]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          listName: formState.inputs.name.value,
        };
        path = `/list/${itemId}`;
        dispatch(editListName(itemId, editItem as CreateListRequest));
        break;
      case 'recipe':
        editItem = {
          name: formState.inputs.name.value,
          id: itemId,
        };
        path = `/recipe/edit`;
        dispatch(editRecipeAction(editItem as EditRecipeRequest));
        break;
      case 'product':
        path = `/product/${itemId}`;
        editItem = {
          name: formState.inputs.name.value,
          category: Number(formState.inputs.category.value),
        };
        dispatch(editProductAction(itemId, editItem as UpdateProductRequest));
        break;
      case 'itemInList':
        path = `/list/item/${itemId}`;
        editItem = {
          count: Number(formState.inputs.count.value),
          weight: Number(formState.inputs.weight.value),
          category: Number(formState.inputs.category.value),
        };
        dispatch(editItemInList(itemId, editItem as UpdateItemInListRequest));
        break;
      case 'itemInRecipe':
        path = `/list/item/${itemId}`;
        editItem = {
          count: Number(formState.inputs.count.value),
          weight: Number(formState.inputs.weight.value),
          category: Number(formState.inputs.category.value),
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
        <form onSubmit={submitHandler}>
          {(element === 'list' || element === 'recipe') && (
            <ManageList
              inputHandler={inputHandler}
              initialValue={{
                name: initialInputs.name,
              }}
              initialValid={true}
            />
          )}
          {/*{element === 'product' && initialInputs.category !== undefined && (*/}
          {/*  <ManageProductForm*/}
          {/*    selectHandler={selectHandler}*/}
          {/*    inputHandler={inputHandler}*/}
          {/*    initialValue={{*/}
          {/*      product: initialInputs.name,*/}
          {/*      category: initialInputs.category,*/}
          {/*    }}*/}
          {/*    initialValid={true}*/}
          {/*  />*/}
          {/*)}*/}
          {(element === 'itemInList' || element === 'itemInRecipe') &&
            initialInputs.category !== undefined && (
              <ManageItemInList
                selectHandler={selectHandler}
                inputHandler={inputHandler}
                initialValue={{
                  product: initialInputs.name,
                  category: initialInputs.category,
                  count: initialInputs?.count || 0,
                  weight: initialInputs?.weight || 0,
                }}
              />
            )}
          <Button
            disabled={!formState.isValid}
            type="submit"
            colorScheme="blue"
          >
            Update!
          </Button>
        </form>
      )}
    </>
  );
};
