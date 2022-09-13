import React, { useEffect } from "react";
import { ListsList } from "../components/List/ListsList";
import { useHttpClient } from "../../common/hooks/http-hook";
import { useDispatch } from "react-redux";
import { setLists } from "../../common/Redux/actions/list";
import { AddList } from "../components/List/AddList";
import { Section } from "../../common/components/UiElements/Section";
import { InfoModal } from "../../common/components/UiElements/InfoModal";
import { LoadingSpinner } from "../../common/components/UiElements/LoadingSpinner";

export const Lists = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const dispatch = useDispatch();
    const userId = "user1";

    useEffect(() => {
        (async () => {
                const loadedProducts = await sendRequest(`/list/${userId}`);
                dispatch(setLists(loadedProducts));
            }
        )();
    }, []);

    return (
        <Section>
            {error &&
                <InfoModal message={error} isError onClose={clearError} title={"Failed!"}/>}
            {isLoading && <LoadingSpinner/>}
            <h2>Add Shopping List</h2>
            <AddList/>
            <h2>Your Shopping Lists!</h2>
            <ListsList/>
        </Section>
    );
};