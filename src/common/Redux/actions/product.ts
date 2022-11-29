import { ProductInterface, UpdateProductRequest } from 'interfaces';
import { ProductAction } from '../action-types/product';

export const setProductsAction = (products: ProductInterface[]) => ({
  type: ProductAction.SET_PRODUCTS,
  payload: products,
});

export const addProductAction = (product: ProductInterface) => ({
  type: ProductAction.ADD_TO_PRODUCTS,
  payload: product,
});
export const editProductAction = (
  id: string,
  product: UpdateProductRequest
) => ({
  type: ProductAction.EDIT_PRODUCTS,
  payload: { ...product, id },
});
export const deleteProductAction = (productId: string) => ({
  type: ProductAction.DELETE_FROM_PRODUCTS,
  payload: productId,
});
