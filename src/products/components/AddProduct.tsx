import React, {useState} from 'react';
import {ManageProduct} from "./ManageProduct";
import {useForm} from "../../common/hooks/form-hook";
import {CreateProductRequest, GetProductResponse} from 'interfaces';
import {useHttpClient} from "../../common/hooks/http-hook";
import {useDispatch} from "react-redux";
import {addProductAction} from "../../common/Redux/actions/product";



export const AddProduct = () => {
    const [isSuccess,setIsSuccess] = useState(false)
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
    const {isLoading, error, sendRequest, clearError,setError} = useHttpClient();
    const dispatch = useDispatch();
    const userId = 'user1';

    const createProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: CreateProductRequest = {
            name: formState.inputs.name.value,
            category: Number(formState.inputs.category.value),
            userId,
        };
        const res = await sendRequest('/product', 'POST', newProduct, {
            'Content-Type': 'application/json',
        });
        if (!res.isSuccess) {
            return setError("Dodawanie produktu nie powiodło się, sprawdź nazwe produktu (nazwa nie może się powtarzać)")
        }
        const newProductWithId: GetProductResponse = {
            ...newProduct,
            id: res.id,
            items: []
        }
        setIsSuccess(true)
        dispatch(addProductAction(newProductWithId))
    };

    //@TODO improve text appearance
    if (isSuccess){
        return (
            <>
                <p>Dodanie produktu powiodło się.</p>
                <button onClick={()=>setIsSuccess(false)}>Dodaj kolejny</button>
            </>
        )
    }

    //@TODO fix the appearance of an error or add a modal
    return (
        <>
            {error && (<>
                    <p>{error}</p>
                    <button onClick={clearError}>Zamknij</button>
                </>
            )}
            {isLoading && <p>Loading</p>}
            {!isLoading && !error && <form onSubmit={createProduct}>
                <ManageProduct selectHandler={selectHandler} inputHandler={inputHandler}/>
                <button disabled={!formState.isValid}>Dodaj produkt</button>
            </form>}

        </>
    );
};