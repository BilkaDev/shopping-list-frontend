import React from 'react';
import {Input} from "../../common/components/FormElements/Input";
import {SelectProductCategory} from "../../common/components/FormElements/SelectProductCategory";
import {VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH} from "../../common/utils/validators";


interface Props {
    inputHandler: (id: string, value: string, isValid: boolean) => void;
    selectHandler: (id: string, value: number, isValid: boolean) => void;
    initialValue?: { product: string; category: number; };
    initialValid?: boolean;
}

export const ManageProduct = (props: Props) => {
    const {inputHandler, selectHandler,initialValid,initialValue} = props;
    return (
        <>
            <Input
                label="Nazwa"
                id="name"
                placeholder="Nazwa produktu"
                errorText="Nazwa produktu jest wymagana (min. 2 znaki max. 100)."
                validators={[VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(100)]}
                onInput={inputHandler}
                initialValid={initialValid}
                initialValue={initialValue?.product}
            />
            <SelectProductCategory onInput={selectHandler} initialValue={initialValue?.category}/>
        </>
    );
};