import {combineReducers} from 'redux';
import productReducer from "../reducers/product-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    products: productReducer
})

export const store = configureStore(
    {reducer:rootReducer}
)
export type RootState = ReturnType<typeof store.getState>