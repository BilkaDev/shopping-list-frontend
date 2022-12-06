import { useEffect } from 'react';
import { MainHeader } from './common/components/Header/MainHeader';
import { Footer } from './common/components/Footer/Footer';
import { NavLinks } from './common/components/Navigation/NavLinks';
import { Route, Routes } from 'react-router-dom';
import { Products } from './products/pages/Products';
import { Lists } from './lists/pages/Lists';
import { ItemsInList } from './lists/pages/ItemsInList';
import { useHttpClient } from './common/hooks/http-hook';
import { ChakraProvider } from '@chakra-ui/react';
import { Auth } from './auth/pages/Auth';
import { InfoModal } from './common/components/UiElements/InfoModal';
import { Recipes } from './recipes/pages/Recipes';
import { ItemsInRecipe } from './recipes/pages/ItemsInRecipe';
import { RecoverPassword } from './auth/pages/RecoverPassword';
import { useAuthSelector } from './common/hooks/auth-hook';
import { loadProductsFetch } from './common/Redux/fetch-services/products';
import { useAppDispatch } from './common/Redux/store';
import { loadRecipesFetch } from './common/Redux/fetch-services/recipes';

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
