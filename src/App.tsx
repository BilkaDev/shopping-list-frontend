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
import { InfoModal } from './common/components/UiElements/InfoModal';
import { Recipes } from './recipes/pages/Recipes';
import { ItemsInRecipe } from './recipes/pages/ItemsInRecipe';
import { setRecipesAction } from './common/Redux/actions/Recipe';
import { RecoverPassword } from './auth/pages/RecoverPassword';
import { useAuth } from './common/hooks/auth-hook';
import { GetRecipesResponse, ProductListResponse } from 'interfaces';

function App() {
  const { error, sendRequest, clearError } = useHttpClient();
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
        <Route path="/" element={<Auth />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<NavLinks />} />
        <Route path="/product" element={<Products />} />
        <Route path="/list" element={<Lists />} />
        <Route path="/list/:id/:name" element={<ItemsInList />} />
        <Route path="/recipe" element={<Recipes />} />
        <Route path="/recipe/:id/:name" element={<ItemsInRecipe />} />
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
            isError
            onClose={clearError}
            title={'Failed!'}
          />
        )}
        <Routes>{routes}</Routes>
      </main>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
