import {  Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../common/Redux/store";
import { RecipeItem } from "./RecipeItem";


export const RecipeList = () => {
    const { recipes } = useSelector((store: RootState) => store.recipes);
    return (
        <TableContainer>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Edit name</Th>
                        <Th>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {recipes.map(recipe => (<RecipeItem key={recipe.id} id={recipe.id} name={recipe.name}/>))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};