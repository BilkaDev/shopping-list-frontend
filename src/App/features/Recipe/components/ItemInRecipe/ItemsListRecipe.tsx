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
import { ItemsListRecipeProps } from '../../containers/recipes.types';

export const ItemsListRecipe = ({
  categoryName,
  categoryId,
  recipe,
}: ItemsListRecipeProps) => {
  const itemsInCategory = recipe?.items?.filter(items => items.product.category === categoryId) ??[]
  if (itemsInCategory.length === 0) {
    return null
  }
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
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {itemsInCategory.map(item => (
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
