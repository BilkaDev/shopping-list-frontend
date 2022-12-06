import {
  AddProductResponse,
  CreateProductRequest,
  DeleteProductResponse,
  ProductInterface,
  ProductListResponse,
} from 'interfaces';
import { SendRequestType } from '../../hooks/http-hook';
import {
  addProductAction,
  deleteProductAction,
  setProductsAction,
} from '../actions/product';
import { FetchTypes } from './fetch.types';

export const loadProductsFetch =
  (sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    const data = await sendRequest<ProductListResponse>(`/product`);
    if (data) {
      dispatch(setProductsAction(data.products));
    }
  };

export const addProductFetch =
  (
    product: CreateProductRequest,
    sendRequest: SendRequestType
  ): FetchTypes<Promise<ProductInterface | undefined>> =>
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
      dispatch(addProductAction(newProductWithId));
      return newProductWithId;
    }
  };

export const deleteProductFetch =
  (id: string, sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    const data = await sendRequest<DeleteProductResponse>(
      `/product/${id}`,
      'DELETE'
    );
    if (data) {
      dispatch(deleteProductAction(id));
    }
  };
