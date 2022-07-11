import React from 'react';
import {Input} from "../../common/components/FormElements/Input";
import {SelectProductCategory} from "../../common/components/FormElements/SelectProductCategory";

export const AddProduct = () => {
    return (
            <form>
                <Input
                    label="Nazwa"
                    placeholder="Nazwa produktu"
                    errorText="Nazwa produktu jest zajęta"
                />
                <SelectProductCategory />

                <button>Dodaj produkt</button>
            </form>
    );
};