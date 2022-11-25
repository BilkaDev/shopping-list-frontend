import React from 'react';
import {
  Center,
  ListItem,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { RecipeInterface } from 'interfaces';
import { ItemInRecipe } from './ItemInRecipe';

interface Props {
  categoryName: string;
  categoryId: number;
  recipe: RecipeInterface;
}

export const ItemsListRecipe = ({
  categoryName,
  categoryId,
  recipe,
}: Props) => {
  return (
    <ListItem>
      <Center>
        <Text fontSize="3xl">{categoryName}</Text>
      </Center>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Count</Th>
              <Th>Weight</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {recipe?.items?.map(item => (
              <ItemInRecipe
                key={item.id}
                category={categoryId}
                recipeId={recipe.id}
                item={item}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </ListItem>
  );
};
