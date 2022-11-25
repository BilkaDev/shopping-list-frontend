import { ProductsItem } from './ProductsItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../common/Redux/store';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

export const ProductsList = () => {
  const { listProducts } = useSelector((store: RootState) => store.products);
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
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
