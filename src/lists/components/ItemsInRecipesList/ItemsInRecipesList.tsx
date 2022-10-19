import React from "react";
import { Stack, Text, UnorderedList } from "@chakra-ui/react";
import { RecipeInterface } from "interfaces";
import { ItemsList } from "../ItemInList/ItemsList";

interface Props {
    recipes: RecipeInterface[];
    category: string[];
}


export function ItemsInRecipesList({ recipes, category }: Props) {
    const list = recipes.map((recipe) => (
        <div key={recipe.id}>
            <Stack paddingTop="1.5rem" justifyContent="center" align="center">
                <Text fontSize="4xl">Recipe {recipe.name}</Text>
            </Stack>
            <div>
                <UnorderedList styleType="none" spacing={6}>
                    {category.map((category, id) => (<ItemsList
                        key={id}
                        categoryId={id}
                        list={recipe}
                        categoryName={category}
                        isRecipe={true}
                    />))}
                </UnorderedList>
            </div>
        </div>
    ));
    return (
        <>
            {list}
        </>
    );
}

