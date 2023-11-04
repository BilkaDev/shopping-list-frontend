import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { RecoverPassword } from '@/App/features/Auth/containers/RecoverPassword';
import { Home } from '@/App/features/Home/containers/Home';
import { Products } from '@/App/features/Product/containers/Products';
import { ShoppingList } from '@/App/features/ShoppingList/containers/ShoppingList';
import { ItemsInList } from '@/App/features/ShoppingList/containers/ItemsInList';
import { Recipes } from '@/App/features/Recipe/containers/Recipes';
import { ItemsInRecipe } from '@/App/features/Recipe/containers/ItemsInRecipe';
import { DefaultLayout, UnauthorizedLayout } from '@/App/layouts';
import { Auth } from '@/App/features/Auth/containers/Auth';

import { useAuthSelector } from '@/Redux/hooks/auth-hook';
import { Outlet } from 'react-router';

export enum AppRouter {
  home = '/',
  auth = '/auth',
  list = '/list',
  recipe = '/recipe',
  product = '/product',
  recoverPassword = '/recover-password',
  itemsInList = '/list/:id/:name',
  itemsInRecipe = '/recipe/:id/:name',
}


export function ProtectedRoutes() {
  const { isLoggedIn } = useAuthSelector();
  const nav = useNavigate();


  useEffect(() => {
    if (!isLoggedIn) {
      nav(AppRouter.auth);
    }
  }, [isLoggedIn]);

  return <Outlet />;
}

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
