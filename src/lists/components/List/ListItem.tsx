import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHttpClient } from "../../../common/hooks/http-hook";
import { deleteList } from "../../../common/Redux/actions/list";
import { Link } from "react-router-dom";
import { EditListName } from "./EditListName";
import { Button, ListItem as ListItemChakra, HStack } from "@chakra-ui/react";
import { InfoModal } from "../../../common/components/UiElements/InfoModal";
import { LoadingSpinner } from "../../../common/components/UiElements/LoadingSpinner";
import { ModalChakra } from "../../../common/components/UiElements/ModalChakra";


interface Props {
    id: string;
    name: string;
}

export const ListItem = ({ id, name }: Props) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const dispatch = useDispatch();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    async function deleteHandler(id: string) {
        const response = await sendRequest(`/list/${id}`, "DELETE");
        if (response.isSuccess) {
            dispatch(deleteList(id));
        }
    }

    return (
        <>
            <ModalChakra isOpen={showEditModal} title={`Change list name: "${name}"`}
                         onClose={() => setShowEditModal(false)}>
                <EditListName itemId={id}></EditListName>
            </ModalChakra>
            {error &&
                <InfoModal message={error} isError onClose={clearError} title={"Failed!"}/>}
            {isLoading && <LoadingSpinner/>}
            <ListItemChakra>
                <HStack spacing={4}>
                    <Link to={`/list/${id}/${name}`}>{name}</Link>
                    <Button onClick={() => setShowEditModal(true)} colorScheme="gray" color="var(--dark)">Edit
                        name</Button>
                    <Button onClick={() => deleteHandler(id)} colorScheme="gray" color="var(--dark)">X</Button>
                </HStack>
            </ListItemChakra>
        </>
    );
};