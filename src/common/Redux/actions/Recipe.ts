import { EditRecipeRequest, RecipeInterface } from "interfaces";
import { RecipeAction } from "../action-types/recipe";

export const setRecipesAction = (recipes: RecipeInterface[]) => ({
    type: RecipeAction.SET_RECIPES,
    payload: recipes,
});
export const addRecipeAction = (recipe: RecipeInterface) => ({
    type: RecipeAction.ADD_RECIPE,
    payload: recipe,
});
export const deleteRecipeAction = (id: string) => ({
    type: RecipeAction.DELETE_RECIPE,
    payload: id,
});
export const editRecipeAction = (recipe: EditRecipeRequest) => ({
    type: RecipeAction.EDIT_RECIPE,
    payload: recipe,
});