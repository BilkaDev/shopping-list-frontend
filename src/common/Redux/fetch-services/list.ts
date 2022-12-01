import { SendRequestType } from '../../hooks/http-hook';
import { FetchTypes } from './fetch.types';
import { addList, deleteList, setLists } from '../actions/list';
import {
  CreateListRequest,
  CreateListResponse,
  DeleteItemInListResponse,
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
