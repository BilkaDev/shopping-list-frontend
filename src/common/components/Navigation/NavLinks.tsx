import React from 'react';
import { NavLink } from 'react-router-dom';
import { Center, ListItem, UnorderedList } from '@chakra-ui/react';

export const NavLinks = () => {
  return (
    <Center>
      <UnorderedList
        styleType={'none'}
        style={{
          fontSize: '4rem',
          color: 'var(--white)',
        }}
      >
        <ListItem>
          <NavLink to="/list">Lists</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/recipe">Recipes</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/product">Products</NavLink>
        </ListItem>
      </UnorderedList>
    </Center>
  );
};
