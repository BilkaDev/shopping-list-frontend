import React, {useEffect, useState} from 'react';
import {ProductsItem} from "./ProductsItem";
import {ProductListResponse} from 'interfaces';
import './ProductsList.css';

interface Props {
    products: ProductListResponse;
    setProducts: (products: ProductListResponse) => void;
}

export const ProductsList = (props: Props) => {
    const [deleteProductId, setDeleteProductId] = useState<string>('');

    useEffect(() => {
        if (deleteProductId.length === 0) return;
        const products = props.products.filter(p => p.id !== deleteProductId);
        setDeleteProductId('');
        props.setProducts(products);
    }, [deleteProductId, props,]);


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
            {props.products.map((product) => (
                <ProductsItem
                    key={product.id}
                    name={product.name}
                    category={product.category}
                    id={product.id}
                    setDeleteProductId={setDeleteProductId}
                />
            ))}
            </tbody>
        </table>
    );
};

