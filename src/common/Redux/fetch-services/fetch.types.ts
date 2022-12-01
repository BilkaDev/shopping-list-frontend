import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { AnyAction } from 'redux';
import {
  CreateListRequest,
  EditRecipeRequest,
  UpdateItemInListRequest,
  UpdateProductRequest,
} from 'interfaces';

export type FetchTypes = ThunkAction<void, RootState, unknown, AnyAction>;

export type EditItemType =
  | CreateListRequest
  | UpdateProductRequest
  | UpdateItemInListRequest
  | EditRecipeRequest;
