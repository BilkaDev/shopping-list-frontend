import React from 'react';
import './ProductsItem.css';
import {useHttpClient} from "../../common/hooks/http-hook";
import {ProductCategory} from 'interfaces'

interface Props {
    name: string;
    category: ProductCategory;
    id: string;
    setDeleteProductId: (id: string) => void;
}

export const ProductsItem = (props: Props) => {
    const {name, id, category,setDeleteProductId} = props;
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    async function deleteProduct(id: string) {
        const response = await sendRequest(`/product/${id}`, 'DELETE');
        if (response.isSuccess) {
            setDeleteProductId(id);
        }
    }

    function editProduct(id: string) {
        console.log(id);
    }

    return (
        <tr>
            <td>{name}</td>
            <td>{ProductCategory[category]}</td>
            <td>
                <button onClick={() => deleteProduct(id)}>Delete</button>
            </td>
            <td>
                <button onClick={() => deleteProduct(id)}>Edit</button>
            </td>

        </tr>
    );
};

