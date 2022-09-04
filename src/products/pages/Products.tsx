import React from "react";
import { ProductsList } from "../components/ProductsList";
import { AddProduct } from "../components/AddProduct";
import "./Products.css";

export const Products = () => {


    //@TODO added error modal
    //@TODO added loading spinner
    return (
        <div className="Products section">
            <h2>Dodaj produkt</h2>
            <AddProduct />
            <h2>Lista produktów</h2>
            <ProductsList />
        </div>
    );
};

