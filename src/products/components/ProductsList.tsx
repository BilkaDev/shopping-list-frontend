import React from 'react';
import './ProductsList.css'
import {ProductsItem} from "./ProductsItem";

export const ProductsList = () => {
    return (
        <table className="Products__list">
            <thead>
            <tr>
                <th>Nazwa</th>
                <th>Edycja</th>
                <th>Usuń</th>
            </tr>
            </thead>
            <tbody>
                <ProductsItem/>
            </tbody>
        </table>
    );
};

