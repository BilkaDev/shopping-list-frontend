import React, { useEffect, useState } from "react";
import { ItemInListInterface } from "interfaces";
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Td, Tr, Divider, Stack, Center } from "@chakra-ui/react";
import { useHttpClient } from "../../../common/hooks/http-hook";
import { useDispatch } from "react-redux";
import { addItemToBasket } from "../../../common/Redux/actions/list";
import { InfoModal } from "../../../common/components/UiElements/InfoModal";


interface Props {
    category: number;
    item: ItemInListInterface;
}

export const ItemInList = ({ category, item }: Props) => {
    const [inBasket, setInBasket] = useState(item.itemInBasket);
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
        await sendRequest(`/list/item/remove-from-basket/${item.id}`, "PATCH");
    };

    return (
        <>
            {error &&
                <InfoModal message={error} isError onClose={clearError} title={"Failed!"}/>}
            {inBasket && <Stack position="relative">
                <Divider position="absolute" top="1.15em" left="10%" right="30%" border="1px"/>
            </Stack>}
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
                    <button><EditIcon/></button>
                </Td>
                <Td>
                    <button><DeleteIcon/></button>
                </Td>
            </Tr>
        </>

    );
};