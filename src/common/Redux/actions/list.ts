import {
  CreateListRequest,
  ItemInListInterface,
  ListInterface,
  ListFilter,
  RecipeInterface,
  UpdateItemInListRequest,
} from '../../../types';
import { ListAction } from '../action-types/list';

export const setLists = (lists: ListFilter[]) => ({
  type: ListAction.SET_LISTS,
  payload: lists,
});
export const setItemsInList = (list: ListInterface) => ({
  type: ListAction.SET_ITEMS_IN_LIST,
  payload: list,
});

export const addList = (list: ListInterface) => ({
  type: ListAction.ADD_TO_LISTS,
  payload: list,
});
export const editListName = (id: string, list: CreateListRequest) => ({
  type: ListAction.EDIT_NAME_LIST,
  payload: { ...list, id },
});
export const deleteList = (listId: string) => ({
  type: ListAction.DELETE_LIST,
  payload: listId,
});

export const addItemToList = (item: ItemInListInterface) => ({
  type: ListAction.ADD_ITEM_TO_LIST,
  payload: item,
});
export const removeItemFromList = (itemId: string) => ({
  type: ListAction.REMOVE_ITEM_FROM_LIST,
  payload: itemId,
});
export const editItemInList = (id: string, item: UpdateItemInListRequest) => ({
  type: ListAction.EDIT_ITEM_IN_LIST,
  payload: { ...item, id },
});

export const addItemToBasket = (itemId: string) => ({
  type: ListAction.ADD_ITEM_TO_BASKET,
  payload: itemId,
});
export const removeItemFromBasket = (itemId: string) => ({
  type: ListAction.REMOVE_FROM_BASKET,
  payload: itemId,
});
export const clearBasket = (listId: string) => ({
  type: ListAction.CLEAR_BASKET,
  payload: listId,
});

export const addRecipeToList = (recipeId: RecipeInterface) => ({
  type: ListAction.ADD_RECIPE_TO_LIST,
  payload: recipeId,
});

export const deleteRecipeFromList = (recipeId: string) => ({
  type: ListAction.DELETE_RECIPE_FROM_LIST,
  payload: recipeId,
});
