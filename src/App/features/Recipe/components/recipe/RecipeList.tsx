import { useSelector } from 'react-redux';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

import { RootState } from '@/Redux/store';

import { RecipeItem } from './RecipeItem';

export const RecipeList = () => {
  const { recipes } = useSelector((store: RootState) => store.recipes);
  return (
    <TableContainer width={{ base: '90%', md: '60%' }}>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Edit name</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {recipes.map(recipe => (
            <RecipeItem key={recipe.id} id={recipe.id} name={recipe.name} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
