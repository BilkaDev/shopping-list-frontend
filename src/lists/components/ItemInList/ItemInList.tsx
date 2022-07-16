import React from 'react';
import {ItemInListInterface} from 'interfaces'


interface Props {
    category:number;
    item: ItemInListInterface;
}

export const ItemInList = ({category,item}:Props) => {
    if (category !== item.product.category) {
        return null
    }
    return (
        <tr>
            <td>{item.product.name}</td>
            <td>{item.count}</td>
            <td>{item.weight}</td>
            <td>Icon</td>
            <td>Icon</td>
        </tr>
    );
};