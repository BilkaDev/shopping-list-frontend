import { SendRequestType } from '../../hooks/http-hook';
import { EditItemType, FetchTypes } from './fetch.types';
import { editProductAction } from '../actions/product';
import { editItemInList, editListName } from '../actions/list';
import { editItemInRecipeAction, editRecipeAction } from '../actions/Recipe';
import {
  CreateListRequest,
  EditRecipeRequest,
  UpdateItemInListRequest,
  UpdateProductRequest,
} from 'interfaces';

export const editItemFetch =
  (
    id: string,
    path: string,
    editItem: EditItemType,
    sendRequest: SendRequestType,
    recipeId = ''
  ): FetchTypes =>
  async dispatch => {
    const data = await sendRequest(path, 'PATCH', editItem);
    const element =
      path.split('/')[2] === 'item'
        ? 'item' + (path.split('?')[1] ?? '')
        : path.split('/')[1];
    if (data) {
      switch (element) {
        case 'product':
          dispatch(editProductAction(id, editItem as UpdateProductRequest));
          break;
        case 'list':
          dispatch(editListName(id, editItem as CreateListRequest));
          break;
        case 'recipe':
          dispatch(editRecipeAction(editItem as EditRecipeRequest));
          break;
        case 'item':
          dispatch(editItemInList(id, editItem as UpdateItemInListRequest));
          break;
        case 'itemRecipe':
          dispatch(
            editItemInRecipeAction(
              id,
              recipeId,
              editItem as UpdateItemInListRequest
            )
          );
          break;
        default:
          return;
      }
    }
  };
