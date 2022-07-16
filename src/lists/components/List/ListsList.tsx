import React from 'react';
import './ListsList.css';
import {RootState} from "../../../common/Redux/store";
import {ListItem} from "./ListItem";
import {useSelector} from "react-redux";

export const ListsList = () => {
    const {listOfLists} = useSelector((store: RootState) => store.lists);
    return (
        <ul className="ListsList section">
            {listOfLists.map(list => (<ListItem key={list.id} id={list.id} name={list.listName}/>))}
        </ul>
    );
};