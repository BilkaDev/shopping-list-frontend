import { Section } from '@/shared/ui/Page';

import { ProductsList } from './components/ProductsList';
import { AddProduct } from './components/AddProduct';

export const Products = () => {
  return (
    <Section>
      <h2>Add product</h2>
      <AddProduct />
      <h2>Product list</h2>
      <ProductsList />
    </Section>
  );
};
