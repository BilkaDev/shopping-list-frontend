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
import { ItemInRecipe } from './ItemInRecipe';
import { ItemsListRecipeProps } from '../../recipes.types';

export const ItemsListRecipe = ({
  categoryName,
  categoryId,
  recipe,
}: ItemsListRecipeProps) => {
  return (
    <ListItem>
      <Center>
        <Text fontSize="3xl">{categoryName}</Text>
      </Center>
      <TableContainer minWidth={{ base: '360px' }} width={{ md: '600px' }}>
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
