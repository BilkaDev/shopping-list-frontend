import React from "react";
import { ProductsList } from "../components/ProductsList";
import { AddProduct } from "../components/AddProduct";
import { Section } from "../../common/components/UiElements/Section";

export const Products = () => {

    return (
        <Section>
            <h2>Add product</h2>
            <AddProduct/>
            <h2>Product list</h2>
            <ProductsList/>
        </Section>
    );
};