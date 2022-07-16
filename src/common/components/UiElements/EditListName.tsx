import React, {useMemo} from 'react';
import {RootState} from "../../Redux/store";
import {EditItemForm} from "../../../lists/components/List/EditItemForm";
import {useSelector} from "react-redux";



interface Props {
    itemId: string;
}


export const EditListName = (props: Props) => {
    const {listOfLists} = useSelector((store: RootState) => store.lists);
    const {itemId} = props;
    const list = useMemo(() => listOfLists.filter(i => i.id === itemId)[0], []);

    //@TODO fix the appearance of an error or add a modal
    return (
            <EditItemForm
                element="list"
                itemId={itemId}
                item={list}
                iniitialInputs={{
                     name: {value: list.listName, isValid: true},
                }
                }
            />
    );
};