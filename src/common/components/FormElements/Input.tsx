import React from 'react';
import './Input.css'

interface Props {
    label: string;
    elementName?: string;
    errorText?: string;
    placeholder?: string;
}

export const Input = (props:Props) => {
const {label,placeholder,elementName} = props;

const element = <input type="text" placeholder={placeholder}/>

    //@TODO add validation to error text message
    return (
        <label className="Input__label"><p>{label}:</p>
            {element}
            {true  && <p className="Input__error-text">{props.errorText}</p>}
        </label>
    );
};