import { RecipeInterface } from "interfaces";
import { RecipeAction } from "../action-types/recipe";


interface RecipesState {
    recipes: RecipeInterface[];
}

interface SetRecipes {
    type: RecipeAction.SET_RECIPES;
    payload: RecipeInterface[];
}

interface AddRecipe {
    type: RecipeAction.ADD_RECIPE;
    payload: RecipeInterface;
}

const initialState: RecipesState = {
    recipes: [],
};

type Action =
    | SetRecipes
    | AddRecipe

export default (state = initialState, action: Action) => {
    switch (action.type) {
        case RecipeAction.SET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
            };
        case RecipeAction.ADD_RECIPE:
            const setRecipes = [...state.recipes, action.payload];
            return {
                ...state,
                recipes: setRecipes
            };
        default:
            return state;
    }
}