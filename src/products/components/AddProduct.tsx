import React from 'react';
import {Input} from "../../common/components/FormElements/Input";

export const AddProduct = () => {
    return (
            <form>
                <Input
                    label="Nazwa"
                    placeholder="Nazwa produktu"
                    errorText="Nazwa produktu jest zajęta"
                />
                <Input
                    label="Dział"
                    element="select"
                />

                <button>Dodaj produkt</button>
            </form>
    );
};