import { RootState } from '@/Redux/store';
import { ListItem } from './ListItem';
import { useSelector } from 'react-redux';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

export const ListsList = () => {
  const { listOfLists } = useSelector((store: RootState) => store.lists);

  return (
    <TableContainer width={{ base: '90%', md: '60%' }}>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listOfLists.map(list => (
            <ListItem key={list.id} id={list.id} name={list.listName} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
