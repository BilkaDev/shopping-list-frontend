import React from 'react';
import {ItemInList} from "./ItemInList";
import {  GetListResponse } from 'interfaces';

interface Props {
    categoryName: string;
    categoryId: number;
    list: GetListResponse;
}

export const ItemsList = ({categoryName,categoryId,list}: Props) => {
    return (
        <li>
            <h2>{categoryName}</h2>
            <table>
                <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Ilość</th>
                    <th>Waga</th>
                    <th>Edycja</th>
                    <th>Usuń</th>
                </tr>
                </thead>
                <tbody>
                {list.items.map((item => <ItemInList key={item.id} category={categoryId} item={item}/>))}
                </tbody>
            </table>
        </li>
    );
};