import {
    EditDescriptionRecipeRequest,
    EditRecipeRequest,
    GetItemInList,
    RecipeInterface,
    UpdateItemInListRequest
} from "interfaces";
import { RecipeAction } from "../action-types/recipe";

interface RecipesState {
    recipes: RecipeInterface[];
}

interface SetRecipes {
    type: RecipeAction.SET_RECIPES;
    payload: RecipeInterface[];
}

interface SetItemInRecipes {
    type: RecipeAction.SET_ITEM_IN_RECIPES;
    payload: RecipeInterface;
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

interface EditDescriptionRecipe {
    type: RecipeAction.EDIT_DESCRIPTION_IN_RECIPE;
    payload: EditDescriptionRecipeRequest;
}

interface DeleteItemInRecipe {
    type: RecipeAction.DELETE_ITEM_IN_RECIPE;
    payload: { id: string, recipeId: string };
}

interface EditItemInRecipePayload extends UpdateItemInListRequest {
    id: string;
    recipeId: string;
    category: number;
}

interface EditItemInRecipe {
    type: RecipeAction.EDIT_ITEM_IN_RECIPE;
    payload: EditItemInRecipePayload;
}

interface AddItemToRecipe {
    type: RecipeAction.ADD_ITEM_TO_RECIPE;
    payload: GetItemInList;
}

const initialState: RecipesState = {
    recipes: [],
};

type Action =
    | SetRecipes
    | AddRecipe
    | DeleteRecipe
    | EditRecipe
    | SetItemInRecipes
    | DeleteItemInRecipe
    | AddItemToRecipe
    | EditItemInRecipe
    | EditDescriptionRecipe

export const recipeReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case RecipeAction.SET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
            };
        case RecipeAction.SET_ITEM_IN_RECIPES:
            const setItem = state.recipes.length > 0 ?
                state.recipes.map(recipe => {
                    if (recipe.id === action.payload.id) {
                        return action.payload;
                    } else return recipe;
                })
                : [action.payload];
            return {
                ...state,
                recipes: setItem,

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
        case RecipeAction.ADD_ITEM_TO_RECIPE:
            const addItemToRecipe = state.recipes
                .map(recipe => {
                    if (recipe.id === action.payload.recipeId) {
                        const items = [...recipe.items, action.payload];
                        return {
                            ...recipe,
                            items,
                        };
                    } else return recipe;
                });
            return {
                ...state,
                recipes: addItemToRecipe
            };
        case RecipeAction.DELETE_ITEM_IN_RECIPE:
            const deleteItemInRecipe = state.recipes
                .map(recipe => {
                    if (recipe.id === action.payload.recipeId) {
                        const items = recipe?.items?.filter(item => item.id !== action.payload.id);
                        return {
                            ...recipe,
                            items,
                        };
                    } else return recipe;
                });
            return {
                ...state,
                recipes: deleteItemInRecipe
            };
        case RecipeAction.EDIT_ITEM_IN_RECIPE:
            const { count, weight, category, id, recipeId } = action.payload;
            const editItemInList = state.recipes
                .map(recipe => {
                    if (recipe.id === recipeId) {
                        const items = recipe.items.map(item => {
                            if (item.id === id) {
                                return {
                                    ...item,
                                    count,
                                    weight,
                                    product: {
                                        ...item.product,
                                        category,
                                    }
                                };
                            } else return item;
                        });
                        return {
                            ...recipe,
                            items
                        };
                    } else return recipe;
                });
            return {
                ...state,
                recipes: editItemInList
            };
        case RecipeAction.EDIT_RECIPE:
            const editRecipe = state.recipes.map(recipe => {
                if (recipe.id === action.payload.id) {
                    return {
                        ...recipe,
                        ...action.payload,
                    };
                } else return recipe;
            });
            return {
                ...state,
                recipes: editRecipe,
            };
        case RecipeAction.EDIT_DESCRIPTION_IN_RECIPE:
            const editDescriptionRecipe = state.recipes.map(recipe => {
                if (recipe.id === action.payload.id) {
                    return {
                        ...recipe,
                        ...action.payload,
                    };
                } else return recipe;
            });
            return {
                ...state,
                recipes: editDescriptionRecipe,
            };
        default:
            return state;
    }
}