import { ItemInList } from './ItemInList';
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
import { ItemsListProps } from '../../lists.types';

export const ItemsList = ({
  categoryName,
  categoryId,
  list,
  isRecipe,
}: ItemsListProps) => {
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
              <Th>In Basket</Th>
              <Th>Count</Th>
              <Th>Weight</Th>
              {!isRecipe && (
                <>
                  <Th>Edit</Th>
                  <Th>Delete</Th>
                </>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {list.items.map(item => (
              <ItemInList
                key={item.id}
                isRecipe={isRecipe}
                category={categoryId}
                item={item}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </ListItem>
  );
};
