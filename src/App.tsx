import { useEffect } from 'react';
import { MainHeader } from './common/components/Header/MainHeader';
import { Footer } from './common/components/Footer/Footer';
import { NavLinks } from './common/components/Navigation/NavLinks';
import { Route, Routes } from 'react-router-dom';
import { Products } from './products/pages/Products';
import { Lists } from './lists/pages/Lists';
import { ItemsInList } from './lists/pages/ItemsInList';
import { useHttpClient } from './common/hooks/http-hook';
import { Auth } from './auth/pages/Auth';
import { InfoModal } from './common/components/UiElements/modals/InfoModal';
import { Recipes } from './recipes/pages/Recipes';
import { ItemsInRecipe } from './recipes/pages/ItemsInRecipe';
import { RecoverPassword } from './auth/pages/RecoverPassword';
import { useAuthSelector } from './common/hooks/auth-hook';
import { loadProductsFetch } from './common/Redux/fetch-services/products';
import { useAppDispatch } from './common/Redux/store';
import { loadRecipesFetch } from './common/Redux/fetch-services/recipes';
import { NAV_LINK } from './common/components/Navigation/Navigation.types';

function App() {
  const { sendRequest, error, clearError } = useHttpClient();
  const dispatch = useAppDispatch();
  const { userId, isLoggedIn } = useAuthSelector();

  useEffect(() => {
    if (!userId) return;
    dispatch(loadRecipesFetch(userId, sendRequest));
    dispatch(loadProductsFetch(sendRequest));
  }, [dispatch, userId, sendRequest]);

  let routes;

  if (!isLoggedIn) {
    routes = (
      <>
        <Route path={NAV_LINK.home} element={<Auth />} />
        <Route path={NAV_LINK.recoverPassword} element={<RecoverPassword />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path={NAV_LINK.home} element={<NavLinks />} />
        <Route path={NAV_LINK.product} element={<Products />} />
        <Route path={NAV_LINK.list} element={<Lists />} />
        <Route path={NAV_LINK.itemsInList} element={<ItemsInList />} />
        <Route path={NAV_LINK.recipe} element={<Recipes />} />
        <Route path={NAV_LINK.itemsInRecipe} element={<ItemsInRecipe />} />
      </>
    );
  }
  return (
    <>
      {isLoggedIn && <MainHeader />}
      <main>
        {error && (
          <InfoModal
            message={error}
            onClose={clearError}
            title={'Failed!'}
            isError
          />
        )}
        <Routes>{routes}</Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
