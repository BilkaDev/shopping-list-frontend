import { NavLink } from 'react-router-dom';
import { ListItem, UnorderedList } from '@chakra-ui/react';

import { Section } from '@/App/shared/ui/Page';
import { AppRouter } from '@/App/Router';

export const Home = () => {
  return (
    <Section>
      <UnorderedList
        styleType={'none'}
        style={{
          fontSize: '4rem',
          color: 'var(--white)',
        }}
      >
        <ListItem>
          <NavLink to={AppRouter.list}>Lists</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to={AppRouter.recipe}>Recipes</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to={AppRouter.product}>Products</NavLink>
        </ListItem>
      </UnorderedList>
    </Section>
  );
};
