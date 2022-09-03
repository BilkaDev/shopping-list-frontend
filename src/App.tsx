import React, {useEffect} from "react";
import {MainHeader} from "./common/components/Header/MainHeader";
import {Footer} from "./common/components/Footer/Footer";
import {NavLinks} from "./common/components/Navigation/NavLinks";
import {Route, Routes} from "react-router-dom";
import {Products} from "./products/pages/Products";
import {Lists} from "./lists/pages/Lists";
import {ItemsInList} from "./lists/pages/ItemsInList";
import {useDispatch} from "react-redux";
import {setProductsAction} from "./common/Redux/actions/product";
import {useHttpClient} from "./common/hooks/http-hook";
import {ChakraProvider} from "@chakra-ui/react";
import {Auth} from "./auth/pages/Auth";

function App() {

    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const dispatch = useDispatch();
    const userId = "user1";

    useEffect(() => {
        (async () => {
                const loadedProducts = await sendRequest(`/product/${userId}`);
                dispatch(setProductsAction(loadedProducts));
            }
        )();
    }, []);

    let routes;
    if (false) {
        routes = <Route path="/" element={<Auth/>}/>;
    } else {
        routes = (<>
            <Route path="/" element={<NavLinks/>}/>
            <Route path="/product" element={<Products/>}/>
            <Route path="/list" element={<Lists/>}/>
            <Route path="/list/:id/:name" element={<ItemsInList/>}/>
        </>);
    }
    return (
        <ChakraProvider>
            <MainHeader/>
            <main>
                <Routes>
                    {routes}
                </Routes>
            </main>
            <Footer/>
        </ChakraProvider>
    );
}

export default App;
