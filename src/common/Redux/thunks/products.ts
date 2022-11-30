import {
  AddProductResponse,
  CreateProductRequest,
  ProductInterface,
  ProductListResponse,
} from 'interfaces';
import { SendRequestType } from '../../hooks/http-hook';
import { addProductAction, setProductsAction } from '../actions/product';
import { ThunksTypes } from './thunks.types';

export const loadProductsThunk =
  (sendRequest: SendRequestType): ThunksTypes =>
  async dispatch => {
    const data = await sendRequest<ProductListResponse>(`/product`);
    if (data) {
      return dispatch(setProductsAction(data.products));
    }
  };

export const AddProductsThunk =
  (product: CreateProductRequest, sendRequest: SendRequestType): ThunksTypes =>
  async dispatch => {
    const data = await sendRequest<AddProductResponse>(
      '/product',
      'POST',
      product
    );
    if (data) {
      const newProductWithId: ProductInterface = {
        ...product,
        id: data.product.id,
      };
      return dispatch(addProductAction(newProductWithId));
    }
  };
