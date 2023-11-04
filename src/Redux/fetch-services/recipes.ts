import { SendRequestType } from '@/App/shared/utils/http-hook';
import { FetchTypes } from './fetch.types';
import {
  addRecipeAction,
  deleteItemInRecipeAction,
  deleteRecipeAction,
  editDescriptionRecipeAction,
  setItemInRecipesAction,
  setRecipesAction,
} from '../actions/Recipe';
import {
  AddRecipeRequest,
  CreateRecipeResponse,
  DeleteItemInListResponse,
  DeleteRecipeResponse,
  EditDescriptionRecipeRequest,
  GetRecipeResponse,
  GetRecipesResponse,
} from '@/types';

export const loadRecipesFetch =
  (userId: string, sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    const data = await sendRequest<GetRecipesResponse>(`/recipe/${userId}`);
    if (data) {
      dispatch(setRecipesAction(data.recipes));
    }
  };

export const loadItemsInRecipeFetch =
  (id: string, sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    const data = await sendRequest<GetRecipeResponse>(`/recipe/user/${id}`);
    if (data) {
      dispatch(setItemInRecipesAction(data.recipe));
    }
  };

export const addRecipeFetch =
  (recipe: AddRecipeRequest, sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    const data = await sendRequest<CreateRecipeResponse>(
      '/recipe',
      'POST',
      recipe
    );
    if (data) {
      dispatch(
        addRecipeAction({
          id: data.id,
          name: recipe.name,
          description: '',
          items: [],
        })
      );
    }
  };

export const removeRecipeFetch =
  (id: string, sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    const data = await sendRequest<DeleteRecipeResponse>(
      `/recipe/${id}`,
      'DELETE'
    );
    if (data) {
      dispatch(deleteRecipeAction(id));
    }
  };

export const changeDescriptionRecipeFetch =
  (
    id: string,
    descriptionInput: string,
    sendRequest: SendRequestType
  ): FetchTypes =>
  async dispatch => {
    const data = await sendRequest<EditDescriptionRecipeRequest>(
      '/recipe/edit-description',
      'PATCH',
      {
        description: descriptionInput,
        id,
      }
    );
    if (data) {
      dispatch(
        editDescriptionRecipeAction({ description: descriptionInput, id })
      );
    }
  };

export const removeItemFromRecipeFetch =
  (
    recipeId: string,
    itemId: string,
    sendRequest: SendRequestType
  ): FetchTypes =>
  async dispatch => {
    const data = await sendRequest<DeleteItemInListResponse>(
      `/list/item/${itemId}`,
      'DELETE'
    );
    if (data) {
      dispatch(deleteItemInRecipeAction(itemId, recipeId));
    }
  };
