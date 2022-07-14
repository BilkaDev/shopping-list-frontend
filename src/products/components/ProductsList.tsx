import React from 'react';
import {ProductsItem} from "./ProductsItem";
import './ProductsList.css';
import {useSelector} from "react-redux";
import {RootState} from "../../common/Redux/store";



export const ProductsList = () => {
    const {listProducts} = useSelector((store: RootState) => store.products)
    return (
        <table className="Products__list">
            <thead>
            <tr>
                <th>Nazwa</th>
                <th>Dział</th>
                <th>Edycja</th>
                <th>Usuń</th>
            </tr>
            </thead>
            <tbody>
            {listProducts.map((product) => (
                <ProductsItem
                    key={product.id}
                    name={product.name}
                    category={product.category}
                    id={product.id}
                />
            ))}
            </tbody>
        </table>
    );
};

