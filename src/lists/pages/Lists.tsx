import React from 'react';
import {Input} from "../../common/components/FormElements/Input";
import './Lists.css'
import {ListsList} from "../components/ListsList";

export const Lists = () => {
    return (
        <div>
            <h2>Dodaj Liste zakupów</h2>
            <form>
                <Input
                    id="name"
                    onInput={()=>{}}
                    label={"Nazwa listy"}
                    validators={[]}
                />
                <button>Dodaj!</button>
            </form>
            <h2>Twoje Listy zakupów!</h2>
            <ListsList/>
        </div>
    );
};