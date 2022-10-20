import React, { useEffect } from "react";
import { MainHeader } from "./common/components/Header/MainHeader";
import { Footer } from "./common/components/Footer/Footer";
import { NavLinks } from "./common/components/Navigation/NavLinks";
import { Route, Routes } from "react-router-dom";
import { Products } from "./products/pages/Products";
import { Lists } from "./lists/pages/Lists";
import { ItemsInList } from "./lists/pages/ItemsInList";
import { useDispatch, useSelector } from "react-redux";
import { setProductsAction } from "./common/Redux/actions/product";
import { useHttpClient } from "./common/hooks/http-hook";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth } from "./auth/pages/Auth";
import { InfoModal } from "./common/components/UiElements/InfoModal";
import { Recipes } from "./recipes/pages/Recipes";
import { ItemsInRecipe } from "./recipes/pages/ItemsInRecipe";
import { setRecipesAction } from "./common/Redux/actions/Recipe";
import { RootState } from "./common/Redux/store";

function App() {
    const { userId } = useSelector((store: RootState) => store.user )
    const { error, sendRequest, clearError } = useHttpClient();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userId) return;
        (async () => {
                const loadedRecipes = await sendRequest(`/recipe/${userId}`);
                dispatch(setRecipesAction(loadedRecipes?.isSuccess === false ? [] : loadedRecipes));
                const loadedProducts = await sendRequest(`/product/${userId}`);
                if (loadedProducts.isSuccess) {
                    dispatch(setProductsAction(loadedProducts.products));
                }
            }
        )();
    }, [userId]);

    let routes;

    if (!userId) {
        routes = <Route path="/" element={<Auth/>}/>;
    } else {
        routes = (<>
            <Route path="/" element={<NavLinks/>}/>
            <Route path="/product" element={<Products/>}/>
            <Route path="/list" element={<Lists/>}/>
            <Route path="/list/:id/:name" element={<ItemsInList/>}/>
            <Route path="/recipe" element={<Recipes/>}/>
            <Route path="/recipe/:id/:name" element={<ItemsInRecipe/>}/>
        </>);
    }
    return (
        <ChakraProvider>
            <MainHeader/>
            <main>
                {error &&
                    <InfoModal message={error} isError onClose={clearError} title={"Failed!"}/>}
                <Routes>
                    {routes}
                </Routes>
            </main>
            <Footer/>
        </ChakraProvider>
    );
}

export default App;

