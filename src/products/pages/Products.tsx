import React, {useEffect} from 'react';
import {ProductsList} from "../components/ProductsList";
import {AddProduct} from "../components/AddProduct";
import {useHttpClient} from "../../common/hooks/http-hook";
import './Products.css';
import {useDispatch} from "react-redux";
import {setProductsAction} from "../../common/Redux/actions/product";

export const Products = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const dispatch = useDispatch()
    const userId = 'user1';

    useEffect(() => {
        (async () => {
                const loadedProducts = await sendRequest(`/product/${userId}`);
                dispatch(setProductsAction(loadedProducts));
            }
        )();
    }, []);

    //@TODO added error modal
    //@TODO added loading spinner
    return (
        <>
            {error && <p>{error}</p>}
            <div className="Products">
                <h2>Dodaj produkt</h2>
                <AddProduct/>
                <h2>Lista produktów</h2>
                {isLoading && (
                    <div className="center">
                        <p>Loading....</p>
                    </div>
                )}
                {!isLoading && <ProductsList />}
            </div>
        </>
    );
};

