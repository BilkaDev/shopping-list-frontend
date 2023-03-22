import { NavLink } from 'react-router-dom';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import { NAV_LINK } from './Navigation.types';
import { Section } from '../UiElements/Section';

export const NavLinks = () => {
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
          <NavLink to={NAV_LINK.list}>Lists</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to={NAV_LINK.recipe}>Recipes</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to={NAV_LINK.product}>Products</NavLink>
        </ListItem>
      </UnorderedList>
    </Section>
  );
};
