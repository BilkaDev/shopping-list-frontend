import React from 'react';
import './Products.css';
import {ProductsList} from "../components/ProductsList";
import {AddProduct} from "../components/AddProduct";

export const Products = () => {
    return (
        <div className="Products">
            <h2>Dodaj produkt</h2>
           <AddProduct/>
            <h2>Lista produktów</h2>
            <ProductsList/>
        </div>
    );
};

