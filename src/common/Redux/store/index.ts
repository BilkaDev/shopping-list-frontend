import { combineReducers } from 'redux';
import { productReducer } from '../reducers/product-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { listReducer } from '../reducers/list-reducer';
import { recipeReducer } from '../reducers/recipe-reducer';
import { authReducer } from '../reducers/auth-reducer';

const rootReducer = combineReducers({
  products: productReducer,
  lists: listReducer,
  recipes: recipeReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
