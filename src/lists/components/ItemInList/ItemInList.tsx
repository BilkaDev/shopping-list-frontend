import React from "react";
import { ItemInListInterface } from "interfaces";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Td, Tr } from "@chakra-ui/react";


interface Props {
    category: number;
    item: ItemInListInterface;
}

export const ItemInList = ({ category, item }: Props) => {
    if (category !== item.product.category) {
        return null;
    }
    return (
        <Tr>
            <Td>{item.product.name}</Td>
            <Td>{item.count}</Td>
            <Td>{item.weight}</Td>
            <Td>
                <button><EditIcon/></button>
            </Td>
            <Td>
                <button><DeleteIcon/></button>
            </Td>
        </Tr>
    );
};