import { combineReducers } from "redux";
import productReducer from "../reducers/product-reducer";
import { configureStore } from "@reduxjs/toolkit";
import listReducer from "../reducers/list-reducer";
import recipes from "../reducers/recipe-reducer";

const rootReducer = combineReducers({
    products: productReducer,
    lists: listReducer,
    recipes: recipes,
});

export const store = configureStore(
    {
        reducer: rootReducer,
    }
);
export type RootState = ReturnType<typeof store.getState>