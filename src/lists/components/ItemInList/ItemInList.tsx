import React, { useEffect, useState } from "react";
import { ItemInListInterface } from "interfaces";
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Td, Tr, Divider, Stack, Center } from "@chakra-ui/react";
import { useHttpClient } from "../../../common/hooks/http-hook";
import { useDispatch } from "react-redux";
import { addItemToBasket, removeItemFromBasket, removeItemFromList } from "../../../common/Redux/actions/list";
import { InfoModal } from "../../../common/components/UiElements/InfoModal";
import { ModalChakra } from "../../../common/components/UiElements/ModalChakra";
import { EditItemInList } from "./EditItemInList";


interface Props {
    category: number;
    item: ItemInListInterface;
}

export const ItemInList = ({ category, item }: Props) => {
    const [inBasket, setInBasket] = useState(item.itemInBasket);
    const [showEditModal, setShowEditModal] = useState(false);
    const dispatch = useDispatch();
    const { error, sendRequest, clearError } = useHttpClient();
    useEffect(() => {
        setInBasket(item.itemInBasket);
    }, [item]);

    if (category !== item.product.category) {
        return null;
    }

    const addToBasket = async () => {
        setInBasket(true);
        dispatch(addItemToBasket(item.id));
        await sendRequest(`/list/item/ad-to-basket/${item.id}`, "PATCH");
    };

    const removeFromBasket = async () => {
        setInBasket(false);
        dispatch(removeItemFromBasket(item.id));
        await sendRequest(`/list/item/remove-from-basket/${item.id}`, "PATCH");
    };

    const deleteItemHandler = async () => {
        const res = await sendRequest(`/list/item/${item.id}`, "DELETE");
        if (res.isSuccess) {
            dispatch(removeItemFromList(item.id));
        }
    };

    return (
        <>
            {error &&
                <InfoModal message={error} isError onClose={clearError} title={"Failed!"}/>}
            {inBasket && <Stack position="relative">
                <Divider position="absolute" top="1.15em" left="10%" right="30%" border="1px"/>
            </Stack>}
            <ModalChakra isOpen={showEditModal} title={`Edit item "${item.product.name}"`}
                         onClose={() => setShowEditModal(false)}>
                <EditItemInList itemId={item.id}/>
            </ModalChakra>
            <Tr>
                <Td cursor="pointer" onClick={!inBasket ? addToBasket : removeFromBasket}>{item.product.name}</Td>
                <Td>
                    <Center>
                        <button>{inBasket ? <CheckIcon onClick={removeFromBasket}/> :
                            <CloseIcon onClick={addToBasket}/>}</button>
                    </Center> </Td>
                <Td>{item.count}</Td>
                <Td>{item.weight}</Td>
                <Td>
                    <button onClick={() => setShowEditModal(true)}><EditIcon/></button>
                </Td>
                <Td>
                    <button onClick={deleteItemHandler}><DeleteIcon/></button>
                </Td>
            </Tr>
        </>

    );
};