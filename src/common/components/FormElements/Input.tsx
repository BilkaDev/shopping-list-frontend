import React, { ChangeEvent, useEffect, useReducer } from "react";
import { validate, Validator } from "../../utils/validators";
import { FormControl, FormErrorMessage, Input as ChakraInput } from "@chakra-ui/react";
import "./Input.css";

interface Props {
    label: string;
    id: string;
    type?: string;
    elementName?: string;
    errorText?: string;
    placeholder?: string;
    onInput: (id: string, value: string, isValid: boolean) => void;
    validators: Validator[];
    initialValue?: string;
    initialValid?: boolean;
    min?: string;
    max?: string;
    autoCompleteOff?: boolean;
}

function inputReducer(state: any, action: any) {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators)
            };
        case "TOUCH":
            return {
                ...state,
                isTouch: true
            };
        default:
            return state;
    }
}

export const Input = (props: Props) => {
    const {
        label,
        placeholder,
        min,
        max,
        onInput,
        id,
        validators,
        initialValid,
        initialValue,
        type,
        autoCompleteOff,
    } = props;
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue || "",
        isValid: initialValid || false,
        isTouch: false
    });
    const { value, isValid, isTouch } = inputState;


    useEffect(() => {
        onInput(id, value, isValid);
    }, [onInput, id, isValid, value]);


    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: "CHANGE",
            value: e.target.value,
            validators
        });
    };

    function touchHandler() {
        dispatch({
            type: "TOUCH"
        });
    }

    const element = <ChakraInput
        width="25rem"
        min={min}
        max={max}
        autoComplete={autoCompleteOff ? "off" : "on"}
        onBlur={touchHandler}
        onChange={inputChangeHandler}
        type={type ? "number" : "text"}
        placeholder={placeholder}
        value={inputState.value}
        variant="filled"
        bgColor="#292A2B"
        color="#DADADA"
    />;
    return (
        <FormControl isInvalid={!isValid && isTouch}>
            <label className="Input__label"><p>{label}:</p>
                {element}
                <FormErrorMessage>{props.errorText}</FormErrorMessage>
            </label>
        </FormControl>
    );
};