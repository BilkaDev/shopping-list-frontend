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
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: '',
        isValid: false,
        isTouch: false,
    });
    const {label, placeholder, elementName, onInput, id, validators} = props;
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

    const element = <input onBlur={touchHandler} onChange={inputChangeHandler} type="text" placeholder={placeholder}/>;
    return (
        <label className="Input__label"><p>{label}:</p>
            {element}
            {!isValid && isTouch && <p className="Input__error-text">{props.errorText}</p>}
        </label>
    );
};