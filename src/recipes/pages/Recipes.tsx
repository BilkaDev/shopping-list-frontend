import { LoadingSpinner } from "../../common/components/UiElements/LoadingSpinner";
import { useHttpClient } from "../../common/hooks/http-hook";
import { InfoModal } from "../../common/components/UiElements/InfoModal";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Section } from "../../common/components/UiElements/Section";
import { RecipeList } from "../components/RecipeList";
import { setRecipesAction } from "../../common/Redux/actions/Recipe";
import { AddRecipe } from "../components/AddRecipe";


export const Recipes = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const dispatch = useDispatch();
    const userId = "user1";

    useEffect(() => {
        (async () => {
                const loadedRecipes = await sendRequest(`/recipe/${userId}`);
                dispatch(setRecipesAction(loadedRecipes?.isSuccess === false ? [] : loadedRecipes));
            }
        )();
    }, []);

    return (
        <Section>
            {error &&
                <InfoModal message={error} isError onClose={clearError} title={"Failed!"}/>}
            {isLoading && <LoadingSpinner/>}
            <h2>Add Recipes</h2>
            <AddRecipe/>
            <h2>Your recipe lists!</h2>
            <RecipeList/>
        </Section>
    );
};