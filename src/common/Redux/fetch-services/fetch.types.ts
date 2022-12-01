import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { AnyAction } from 'redux';
import {
  CreateListRequest,
  EditRecipeRequest,
  UpdateItemInListRequest,
  UpdateProductRequest,
} from 'interfaces';

export type FetchTypes<T = void> = ThunkAction<
  Promise<T>,
  RootState,
  unknown,
  AnyAction
>;

export type EditItemType =
  | CreateListRequest
  | UpdateProductRequest
  | UpdateItemInListRequest
  | EditRecipeRequest;
