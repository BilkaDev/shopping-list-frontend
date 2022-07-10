import React, {useEffect, useState} from 'react';
import {ProductsList} from "../components/ProductsList";
import {AddProduct} from "../components/AddProduct";
import {useHttpClient} from "../../common/hooks/http-hook";
import {ProductListResponse} from 'interfaces';
import './Products.css';

export const Products = () => {
    const [loadedProducts, setLoadedProducts] = useState<ProductListResponse>([]);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const userId = 'user1';

    useEffect(() => {
        (async () => {
                const loadedProducts = await sendRequest(`/product/${userId}`);
                setLoadedProducts(loadedProducts);
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
                {!isLoading && <ProductsList products={loadedProducts} setProducts={setLoadedProducts}/>}
            </div>
        </>
    );
};

