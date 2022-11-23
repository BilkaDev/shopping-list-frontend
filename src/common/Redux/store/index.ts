import { combineReducers } from "redux";
import productReducer from "../reducers/product-reducer";
import { configureStore } from "@reduxjs/toolkit";
import listReducer from "../reducers/list-reducer";
import recipes from "../reducers/recipe-reducer";
import auth from "../reducers/auth-reducer";

const rootReducer = combineReducers({
    products: productReducer,
    lists: listReducer,
    recipes: recipes,
    auth: auth,
});

export const store = configureStore(
    {
        reducer: rootReducer,
    }
);
export type RootState = ReturnType<typeof store.getState>