import { useEffect } from 'react';
import { MainHeader } from './common/components/Header/MainHeader';
import { Footer } from './common/components/Footer/Footer';
import { NavLinks } from './common/components/Navigation/NavLinks';
import { Route, Routes } from 'react-router-dom';
import { Products } from './products/pages/Products';
import { Lists } from './lists/pages/Lists';
import { ItemsInList } from './lists/pages/ItemsInList';
import { useDispatch } from 'react-redux';
import { setProductsAction } from './common/Redux/actions/product';
import { useHttpClient } from './common/hooks/http-hook';
import { ChakraProvider } from '@chakra-ui/react';
import { Auth } from './auth/pages/Auth';
import { InfoModal } from './common/components/UiElements/modals/InfoModal';
import { Recipes } from './recipes/pages/Recipes';
import { ItemsInRecipe } from './recipes/pages/ItemsInRecipe';
import { setRecipesAction } from './common/Redux/actions/Recipe';
import { RecoverPassword } from './auth/pages/RecoverPassword';
import { useAuth } from './common/hooks/auth-hook';
import { GetRecipesResponse, ProductListResponse } from 'interfaces';
import { NAV_LINK } from './common/components/Navigation/Navigation.types';

function App() {
  const { sendRequest, error, clearError } = useHttpClient();
  const dispatch = useDispatch();
  const { userId, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const loadedRecipesData = await sendRequest<GetRecipesResponse>(
        `/recipe/${userId}`
      );
      dispatch(
        setRecipesAction(loadedRecipesData ? loadedRecipesData.recipes : [])
      );
      const loadedProductsData = await sendRequest<ProductListResponse>(
        `/product`
      );
      if (loadedProductsData) {
        dispatch(setProductsAction(loadedProductsData.products));
      }
    })();
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
    <ChakraProvider>
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
    </ChakraProvider>
  );
}

export default App;
