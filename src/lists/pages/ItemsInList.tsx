import { ProductCategory } from "interfaces";
import React, { useEffect } from "react";
import { ItemsList } from "../components/ItemInList/ItemsList";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearBasket, setItemsInList } from "../../common/Redux/actions/list";
import { useHttpClient } from "../../common/hooks/http-hook";
import { AddItem } from "../components/ItemInList/AddItem";
import { RootState } from "../../common/Redux/store";
import { InfoModal } from "../../common/components/UiElements/InfoModal";
import { LoadingSpinner } from "../../common/components/UiElements/LoadingSpinner";
import { Section } from "../../common/components/UiElements/Section";
import { Center, Stack, Text, UnorderedList } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { AddRecipeToList } from "../components/ItemsInRecipesList/AddRecipeToList";
import { ItemsInRecipesList } from "../components/ItemsInRecipesList/ItemsInRecipesList";

export const ItemsInList = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const { id, name } = useParams();
    const dispatch = useDispatch();
    const entries = Object.entries(ProductCategory);
    const category: string[] = [];
    const { list } = useSelector((store: RootState) => store.lists);

    useEffect(() => {
        (async () => {
            const list = await sendRequest(`/list/user/${id}`);
            dispatch(setItemsInList(list));
        })();
    }, [id]);

    for (const key of entries) {
        if (typeof key[1] === "number") {
            category.push(key[0]);
        }
    }

    async function clearBasketHandler() {
        if (id === undefined) {
            return;
        }
        await sendRequest(`/list/clear-basket/${id}`, "PATCH");
        dispatch(clearBasket(id));
    }

    return (
        <>
            {error &&
                <InfoModal message={error} isError onClose={clearError} title={"Failed!"}/>}
            {isLoading && <LoadingSpinner/>}
            <Section>
                <Center>
                    <Text fontSize="4xl">Add product to list</Text>
                </Center>
                <AddItem/>
                <AddRecipeToList/>\
                {/*render list product*/}
                <Stack paddingTop="1.5rem" direction="row" spacing={20}>
                    <Text fontSize="4xl">List {name}</Text>
                    <Text cursor="pointer" alignSelf="center" onClick={clearBasketHandler}>Clear basket <button>
                        <CloseIcon/></button>
                    </Text>
                </Stack>
                <div>
                    <UnorderedList styleType="none" spacing={6}>
                        {category.map((category, id) => (<ItemsList
                            key={id}
                            categoryId={id}
                            list={list}
                            categoryName={category}
                        />))}
                    </UnorderedList>
                </div>
                {/*render recipe product*/}
                <ItemsInRecipesList listId={id as string} recipes={list.recipes} category={category}/>
            </Section>
        </>
    );
};