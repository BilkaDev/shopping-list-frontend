import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useHttpClient} from "../../../common/hooks/http-hook";
import {deleteList} from "../../../common/Redux/actions/list";
import {Link} from "react-router-dom";
import {Modal} from "../../../common/components/UiElements/Modal";
import {EditListName} from "../../../common/components/UiElements/EditListName";

interface Props {
    id: string;
    name: string;
}

export const ListItem = ({id, name}: Props) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const dispatch = useDispatch();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();


    //@TODO Added error text when delted no complited, and add loading spinner
    async function deleteHandler(id: string) {
        const response = await sendRequest(`/list/${id}`, 'DELETE');
        if (response.isSuccess) {
            dispatch(deleteList(id));
        }
    }

    return (
        <>
            {showEditModal &&
                <Modal header={`Zmień nazwe listy "${name}"`}
                       onCancel={() => setShowEditModal(false)}
                       show={showEditModal}
                       footer={<button onClick={() => setShowEditModal(false)}>Zamknij</button>}
                >
                    <EditListName itemId={id}></EditListName>
                </Modal>}
            <li>
                <Link to={`/list/${id}`}>{name}</Link>
                <button onClick={()=>setShowEditModal(true)}>zmień nazwe</button>
                <button onClick={() => deleteHandler(id)}>Usuń</button>
            </li>
        </>
    );
};