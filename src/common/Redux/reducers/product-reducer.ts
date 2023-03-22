import { ProductInterface } from '../../../types';
import { ProductAction } from '../action-types/product';

export interface ProductState {
  listProducts: ProductInterface[];
}

export interface SetProducts {
  type: ProductAction.SET_PRODUCTS;
  payload: ProductInterface[];
}
interface AddProduct {
  type: ProductAction.ADD_TO_PRODUCTS;
  payload: ProductInterface;
}
interface EditProduct {
  type: ProductAction.EDIT_PRODUCTS;
  payload: ProductInterface;
}
interface DeleteProduct {
  type: ProductAction.DELETE_FROM_PRODUCTS;
  payload: string;
}
const initialState: ProductState = {
  listProducts: [],
};

export type Action = SetProducts | AddProduct | DeleteProduct | EditProduct;

export const productReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ProductAction.SET_PRODUCTS:
      return {
        ...state,
        listProducts: action.payload,
      };
    case ProductAction.ADD_TO_PRODUCTS:
      return {
        ...state,
        listProducts: [...state.listProducts, action.payload],
      };
    case ProductAction.EDIT_PRODUCTS:
      const newList = state.listProducts.map(p => {
        if (p.id === action.payload.id) {
          return action.payload;
        }
        return p;
      });
      return {
        ...state,
        listProducts: newList,
      };
    case ProductAction.DELETE_FROM_PRODUCTS:
      const listProducts = state.listProducts.filter(
        p => p.id !== action.payload
      );
      return {
        ...state,
        listProducts,
      };
    default:
      return state;
  }
};
