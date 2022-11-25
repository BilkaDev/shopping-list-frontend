import React from 'react';
import { RootState } from '../../../common/Redux/store';
import { ListItem } from './ListItem';
import { useSelector } from 'react-redux';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

export const ListsList = () => {
  const { listOfLists } = useSelector((store: RootState) => store.lists);

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
          {listOfLists.map(list => (
            <ListItem key={list.id} id={list.id} name={list.listName} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
