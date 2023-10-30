import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { RecoverPassword } from '@/features/Auth/RecoverPassword';
import { Home } from './features/Home/Home';
import { Products } from '@/features/Product/Products';
import { ShoppingList } from '@/features/ShoppingList/ShoppingList';
import { ItemsInList } from '@/features/ShoppingList/ItemsInList';
import { Recipes } from '@/features/Recipe/Recipes';
import { ItemsInRecipe } from '@/features/Recipe/ItemsInRecipe';
import { DefaultLayout } from '@/layouts/DefaultLayout';
import { UnauthorizedLayout } from '@/layouts/UnauthorizedLayout';
import { Auth } from '@/features/Auth/Auth';

import { AppRouter } from './AppRouter';
import { ProtectedRoutes } from './common/ProtectedRoutes';

function Router() {
  return (
    <Routes>
      <Route element={<UnauthorizedLayout />}>
        <Route path={AppRouter.recoverPassword} element={<RecoverPassword />} />
        <Route path={AppRouter.auth} element={<Auth />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route element={<DefaultLayout />}>
          <Route path={AppRouter.home} element={<Home />} />
          <Route path={AppRouter.product} element={<Products />} />
          <Route path={AppRouter.list} element={<ShoppingList />} />
          <Route path={AppRouter.itemsInList} element={<ItemsInList />} />
          <Route path={AppRouter.recipe} element={<Recipes />} />
          <Route path={AppRouter.itemsInRecipe} element={<ItemsInRecipe />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
