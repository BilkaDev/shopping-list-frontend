import React, {useState} from 'react';
import {useHttpClient} from "../../common/hooks/http-hook";
import {ProductCategory} from 'interfaces';
import {Modal} from "../../common/components/UiElements/Modal";
import './ProductsItem.css';
import {EditProduct} from "./EditProduct";

interface Props {
    name: string;
    category: ProductCategory;
    id: string;
    setDeleteProductId: (id: string) => void;
}

export const ProductsItem = (props: Props) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const {name, id, category, setDeleteProductId} = props;
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    //@TODO Added error text when delted no complited, and add loading spinner
    async function deleteProduct(id: string) {
        const response = await sendRequest(`/product/${id}`, 'DELETE');
        if (response.isSuccess) {
            setDeleteProductId(id);
        }
    }

    function editProduct(id: string) {
        setShowEditModal(true);
    }

    return (
        <>
            {showEditModal &&
                <Modal header={`Edycja produktu "${name}"`}
                       onCancel={() => setShowEditModal(false)}
                       show={showEditModal}
                       footer={<button onClick={() => setShowEditModal(false)}>Zamknij</button>}
                >
                    <EditProduct productId={id}/>
                </Modal>}
            <tr>
                <td>{name}</td>
                <td>{ProductCategory[category]}</td>
                <td>
                    <button onClick={() => deleteProduct(id)}>Delete</button>
                </td>
                <td>
                    <button onClick={() => editProduct(id)}>Edytuj</button>
                </td>

            </tr>
        </>
    );
};

