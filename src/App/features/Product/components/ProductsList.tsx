import { useSelector } from 'react-redux';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

import { RootState } from '@/Redux/store';

import { ProductsItem } from './ProductsItem';

export const ProductsList = () => {
  const { listProducts } = useSelector((store: RootState) => store.products);
  return (
    <TableContainer width={{ base: '90%', md: '60%' }}>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listProducts.map(product => (
            <ProductsItem
              key={product.id}
              name={product.name}
              category={product.category}
              id={product.id}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
