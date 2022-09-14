import { ProductCategory } from "interfaces";
import React, { useEffect } from "react";
import { ItemsList } from "../components/ItemInList/ItemsList";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setItemsInList } from "../../common/Redux/actions/list";
import { useHttpClient } from "../../common/hooks/http-hook";
import { AddItem } from "../components/ItemInList/AddItem";
import { RootState } from "../../common/Redux/store";
import { InfoModal } from "../../common/components/UiElements/InfoModal";
import { LoadingSpinner } from "../../common/components/UiElements/LoadingSpinner";
import { Section } from "../../common/components/UiElements/Section";

export const ItemsInList = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const { id, name } = useParams();
    const dispatch = useDispatch();
    const entries = Object.entries(ProductCategory);
    const category = [];
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

    return (
        <>
            {error &&
                <InfoModal message={error} isError onClose={clearError} title={"Failed!"}/>}
            {isLoading && <LoadingSpinner/>}
            <Section>
                <h2>Add product to list</h2>
                <AddItem/>
                <h2>List {name}</h2>
                <div>
                    <ul>
                        {category.map((category, id) => (<ItemsList
                            key={id}
                            categoryId={id}
                            list={list}
                            categoryName={category}
                        />))}
                    </ul>
                </div>
            </Section>
        </>
    );
};