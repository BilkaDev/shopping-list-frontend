import { RecipeInterface } from "interfaces";
import { RecipeAction } from "../action-types/recipe";

export const setRecipesAction = (recipes: RecipeInterface[]) => ({
    type: RecipeAction.SET_RECIPES,
    payload: recipes,
});
export const addRecipeAction = (recipe: RecipeInterface) => ({
    type: RecipeAction.ADD_RECIPE,
    payload: recipe,
});