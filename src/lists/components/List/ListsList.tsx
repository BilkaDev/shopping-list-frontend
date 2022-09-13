import React from "react";
import { RootState } from "../../../common/Redux/store";
import { ListItem } from "./ListItem";
import { useSelector } from "react-redux";
import { UnorderedList } from "@chakra-ui/react";

export const ListsList = () => {
    const { listOfLists } = useSelector((store: RootState) => store.lists);

    //@TODO Change list to table
    return (
        <UnorderedList styleType={"none"} spacing={4}>
            {listOfLists.map(list => (<ListItem key={list.id} id={list.id} name={list.listName}/>))}
        </UnorderedList>
    );
};