import React, {useCallback, useReducer} from 'react';
import {Input} from "../../common/components/FormElements/Input";
import {SelectProductCategory} from "../../common/components/FormElements/SelectProductCategory";
import {VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH} from "../../common/utils/validators";

export const AddProduct = () => {

    function formReducer(state: any, action: any) {
        switch (action.type) {
            case "SELECT_CHANGE":
                return {
                    ...state,
                    inputs: {
                        ...state.inputs,
                        [action.inputId]: {value: action.value, isValid: action.isValid}
                    }
                };
            case "INPUT_CHANGE":
                let formIsValid = true;
                for (const inputId in state.inputs) {
                    if (!state.inputs[inputId]) {
                        continue;
                    }
                    if (inputId === action.inputId) {
                        formIsValid = formIsValid && action.isValid;
                    } else {
                        formIsValid = formIsValid && state.inputs[inputId].isValid;
                    }
                }
                return {
                    ...state,
                    inputs: {
                        ...state.inputs,
                        [action.inputId]: {value: action.value, isValid: action.isValid}
                    },
                    isValid: formIsValid
                };
            default:
                return state;
        }
    }

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            name: {
                value: "",
                isValid: false,
            },
            category: {
                value: 0,
                isValid: true,
            }
        },
        isValid: false
    });

    const selectHandler = useCallback((id: string, value: number, isValid: boolean) => {
        dispatch({
            type: 'SELECT_CHANGE',
            inputId: id,
            value,
            isValid

        });
    }, []);

    const inputHandler = useCallback((id: string, value: string, isValid: boolean) => {
        dispatch({
            type: 'INPUT_CHANGE',
            inputId: id,
            value,
            isValid

        });
    }, []);

    return (
        <form>
            <Input
                label="Nazwa"
                id="name"
                placeholder="Nazwa produktu"
                errorText="Nazwa produktu jest wymagana (min. 2 znaki max. 100)."
                validators={[VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(100)]}
                onInput={inputHandler}
            />
            <SelectProductCategory onInput={selectHandler}/>

            <button>Dodaj produkt</button>
        </form>
    );
};