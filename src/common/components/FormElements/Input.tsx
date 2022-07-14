import React, {ChangeEvent, useEffect, useReducer} from 'react';
import './Input.css';
import {validate, Validator} from "../../utils/validators";

interface Props {
    label: string;
    id: string;
    elementName?: string;
    errorText?: string;
    placeholder?: string;
    onInput: (id: string, value: string, isValid: boolean) => void;
    validators: Validator[];
    initialValue?: string;
    initialValid?: boolean;
}

function inputReducer(state: any, action: any) {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators),
            };
        case "TOUCH":
            return {
                ...state,
                isTouch: true,
            };
        default:
            return state;
    }
}

export const Input = (props: Props) => {
    const {label, placeholder, elementName, onInput, id, validators,initialValid,initialValue} = props;
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue || '',
        isValid: initialValid || false,
        isTouch: false,
    });
    const {value, isValid, isTouch} = inputState;


    useEffect(() => {
        onInput(id, value, isValid);
    }, [onInput, id, isValid, value]);


    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'CHANGE',
            value: e.target.value,
            validators,
        });
    };

    function touchHandler() {
        dispatch({
            type: 'TOUCH',
        });
    }

    const element = <input
        onBlur={touchHandler}
        onChange={inputChangeHandler}
        type="text"
        placeholder={placeholder}
        value={inputState.value}
    />;
    return (
        <label className="Input__label"><p>{label}:</p>
            {element}
            {!isValid && isTouch && <p className="Input__error-text">{props.errorText}</p>}
        </label>
    );
};