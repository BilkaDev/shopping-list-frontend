import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NAV_LINK } from '../components/Navigation/Navigation.types';
import { RecoverPassword } from '../../auth/pages/RecoverPassword';
import { NavLinks } from '../components/Navigation/NavLinks';
import { Products } from '../../products/pages/Products';
import { Lists } from '../../lists/pages/Lists';
import { ItemsInList } from '../../lists/pages/ItemsInList';
import { Recipes } from '../../recipes/pages/Recipes';
import { ItemsInRecipe } from '../../recipes/pages/ItemsInRecipe';
import { ProtectedRoutes } from './ProtectedRoutes';

function Views() {
  return (
    <Routes>
      {' '}
      <Route path={NAV_LINK.recoverPassword} element={<RecoverPassword />} />
      <Route element={<ProtectedRoutes />}>
        <Route path={NAV_LINK.home} element={<NavLinks />} />
        <Route path={NAV_LINK.product} element={<Products />} />
        <Route path={NAV_LINK.list} element={<Lists />} />
        <Route path={NAV_LINK.itemsInList} element={<ItemsInList />} />
        <Route path={NAV_LINK.recipe} element={<Recipes />} />
        <Route path={NAV_LINK.itemsInRecipe} element={<ItemsInRecipe />} />
      </Route>
    </Routes>
  );
}

export default Views;
