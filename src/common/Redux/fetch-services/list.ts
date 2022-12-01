import { SendRequestType } from '../../hooks/http-hook';
import { FetchTypes } from './fetch.types';
import { addList } from '../actions/list';
import { CreateListRequest, CreateListResponse } from 'interfaces';

export const addListFetch =
  (list: CreateListRequest, sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    const data = await sendRequest<CreateListResponse>('/list', 'POST', list);
    if (data) {
      const newList = {
        id: data.id,
        listName: list.listName,
        items: [],
        recipes: [],
      };
      dispatch(addList(newList));
    }
  };
