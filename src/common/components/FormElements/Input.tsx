import React from 'react';
import './Input.css'

interface Props {
    label: string;
    element?: string;
    errorText?: string;
    placeholder?: string;
}

export const Input = (props:Props) => {
const {label,placeholder,element : elementName} = props;

let element;
switch (elementName) {
    case 'select':
        element = (<select>
            <option value="0">Dział1</option>
            <option value="1">Dział2</option>
            <option value="2">Dział3</option>
            <option value="3">Dział4</option>
        </select>)
        break;
    default : element = <input type="text" placeholder={placeholder}/>
        break;
}
    //@TODO add validation to error text message
    return (
        <label className="Input__label"><p>{label}:</p>
            {element}
            {true  && <p className="Input__error-text">{props.errorText}</p>}
        </label>
    );
};