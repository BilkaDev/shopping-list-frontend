import React from "react";
import { ItemInList } from "./ItemInList";
import { GetListResponse } from "interfaces";
import { Center, ListItem, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react";

interface Props {
    categoryName: string;
    categoryId: number;
    list: GetListResponse;
}

export const ItemsList = ({ categoryName, categoryId, list }: Props) => {
    return (
        <ListItem>
            <Center>
                <Text fontSize="3xl">{categoryName}</Text>
            </Center>
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>In Basket</Th>
                            <Th>Count</Th>
                            <Th>Weight</Th>
                            <Th>Edit</Th>
                            <Th>Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {list.items.map((item => <ItemInList key={item.id} category={categoryId} item={item}/>))}
                    </Tbody>
                </Table>
            </TableContainer>
        </ListItem>
    );
};