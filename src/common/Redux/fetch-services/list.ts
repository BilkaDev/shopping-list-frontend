import { SendRequestType } from '../../hooks/http-hook';
import { FetchTypes } from './fetch.types';
import {
  addItemToBasket,
  addList,
  clearBasket,
  deleteList,
  removeItemFromBasket,
  removeItemFromList,
  setItemsInList,
  setLists,
} from '../actions/list';
import {
  CreateListRequest,
  CreateListResponse,
  DeleteItemInListResponse,
  GetListResponse,
  GetListsResponse,
  ListInterface,
} from 'interfaces';

export const loadListFetch =
  (userId: string, sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    const data = await sendRequest<GetListsResponse>(`/list/${userId}`);
    dispatch(setLists(data ? data.lists : []));
  };

export const addListFetch =
  (list: CreateListRequest, sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    const data = await sendRequest<CreateListResponse>('/list', 'POST', list);
    if (data) {
      const newList: ListInterface = {
        id: data.id,
        listName: list.listName,
        items: [],
        recipes: [],
      };
      dispatch(addList(newList));
    }
  };

export const deleteListFetch =
  (id: string, sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    const data = await sendRequest<DeleteItemInListResponse>(
      `/list/${id}`,
      'DELETE'
    );
    if (data) {
      dispatch(deleteList(id));
    }
  };

export const loadItemsInListFetch =
  (listId: string, sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    const data = await sendRequest<GetListResponse>(`/list/user/${listId}`);
    if (data) dispatch(setItemsInList(data.list));
  };

export const removeItemFromListFetch =
  (itemId: string, sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    const data = await sendRequest<DeleteItemInListResponse>(
      `/list/item/${itemId}`,
      'DELETE'
    );
    if (data) {
      dispatch(removeItemFromList(itemId));
    }
  };

export const addToBasketFetch =
  (itemId: string, sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    dispatch(addItemToBasket(itemId));
    await sendRequest(`/list/item/ad-to-basket/${itemId}`, 'PATCH');
  };

export const removeFromBasketFetch =
  (itemId: string, sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    dispatch(removeItemFromBasket(itemId));
    await sendRequest(`/list/item/remove-from-basket/${itemId}`, 'PATCH');
  };

export const clearBasketFetch =
  (itemId: string, sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    await sendRequest(`/list/clear-basket/${itemId}`, 'PATCH');
    dispatch(clearBasket(itemId));
  };
