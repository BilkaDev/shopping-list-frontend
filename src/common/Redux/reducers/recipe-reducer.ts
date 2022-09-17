import { EditRecipeRequest, RecipeInterface } from "interfaces";
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

interface DeleteRecipe {
    type: RecipeAction.DELETE_RECIPE;
    payload: string;
}

interface EditRecipe {
    type: RecipeAction.EDIT_RECIPE;
    payload: EditRecipeRequest;
}

const initialState: RecipesState = {
    recipes: [],
};

type Action =
    | SetRecipes
    | AddRecipe
    | DeleteRecipe
    | EditRecipe

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
        case RecipeAction.DELETE_RECIPE:
            const deleteRecipe = state.recipes.filter(recipe => recipe.id !== action.payload);
            return {
                ...state,
                recipes: deleteRecipe
            };
        case RecipeAction.EDIT_RECIPE:
            const editRecipe = state.recipes.map(recipe => {
                if (recipe.id === action.payload.id) {
                    return {
                        ...recipe,
                        ...action.payload ,
                    };
                } else return recipe;
            });
            return {
                ...state,
                recipes: editRecipe,
            };
        default:
            return state;
    }
}