import { deleteList } from "../../common/Redux/actions/list";
import { InfoModal } from "../../common/components/UiElements/InfoModal";
import { ModalChakra } from "../../common/components/UiElements/ModalChakra";
import { Td, Tr } from "@chakra-ui/react";
import { LoadingSpinner } from "../../common/components/UiElements/LoadingSpinner";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useHttpClient } from "../../common/hooks/http-hook";
import { EditListName } from "../../lists/components/List/EditListName";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";


interface Props {
    id: string;
    name: string;
}

export const RecipeItem = ({ id, name }: Props) => {
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
            <Tr>
                <Td><Link to={`/list/${id}/${name}`}>{name}</Link></Td>
                <Td>
                    <button onClick={() => setShowEditModal(true)}><EditIcon/></button>
                </Td>
                <Td>
                    <button onClick={() => deleteHandler(id)}><DeleteIcon/></button>
                </Td>
            </Tr>
        </>
    );
};