import React, {useEffect, useState} from 'react';
import {ManageProduct} from "./ManageProduct";
import {useForm} from "../../common/hooks/form-hook";
import {useHttpClient} from "../../common/hooks/http-hook";
import {UpdateProductRequest} from 'interfaces';


interface Props {
    productId: string;
}

export const EditProduct = (props: Props) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const {formState, selectHandler, inputHandler} = useForm({
            name: {
                value: "",
                isValid: false,
            },
            category: {
                value: 0,
                isValid: true,
            }
        }, false
    );
    const {isLoading, error, sendRequest, clearError, setError} = useHttpClient();

    //@TODO USERID CHANGEIT
    const userId = 'user1';
    const {productId} = props;

    useEffect(() => {
        return () => clearError()
    },[])
    
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const editProduct: UpdateProductRequest = {
            name: formState.inputs.name.value,
            category: formState.inputs.category.value,
        };
        const res = await sendRequest(`/product/${productId}/${userId}`, 'PATCH', editProduct, {
            'Content-Type': 'application/json',
        });
        if (!res.isSuccess) {
            return setError("Ops. coś poszło nie tak... sprawdź nazwe produktu (nie może się powtarzać)");
        }
        setIsSuccess(true);

    };
    //@TODO improve text appearance
    if (isSuccess) {
        return (
            <>
                <p>Edycja produktu powiodła się.</p>
            </>
        );
    }


    //@TODO fix the appearance of an error or add a modal

    return (
        <>
            {error && (<>
                    <p>{error}</p>
                </>
            )}
            {isLoading && <p>Loading</p>}
            {!isLoading && !error &&
                (<form onSubmit={submitHandler}>
                    <ManageProduct selectHandler={selectHandler} inputHandler={inputHandler}/>
                    <button disabled={!formState.isValid }>Aktualizuj!</button>
                </form>)
            }
        </>
    );
};