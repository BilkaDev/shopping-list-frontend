import React, { useState } from "react";
import { HStack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../common/Redux/store";
import { Select } from "../../../common/components/UiElements/Select";

export function RecipeToList() {
    const { recipes } = useSelector((store: RootState) => store.recipes);
    const [selectValue, setSelectValue] = useState(recipes[0].name);

    // @todo add compontent add recipes...
    if (recipes.length === 0) {
        return <p> no recipes to select</p>;
    }

    return (
        <HStack>
            <Text>Add recipes to list:</Text>
            <Select
                value={selectValue}
                setValue={setSelectValue}
            >
                {recipes.map((recipe => (
                    <option key={recipe.id} value={recipe.name}>{recipe.name}</option>
                )))}
            </Select>
        </HStack>
    );
}