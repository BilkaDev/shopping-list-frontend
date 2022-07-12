import React, {useState} from 'react';
import {ManageProduct} from "./ManageProduct";
import {useForm} from "../../common/hooks/form-hook";
import {CreateProductRequest, ProductListResponse} from 'interfaces';
import {useHttpClient} from "../../common/hooks/http-hook";


interface Props {
    loadedProducts:ProductListResponse;
    setLoadedProducts: (product:ProductListResponse)=> void;
}

export const AddProduct = (props: Props) => {
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
    const userId = 'user1';

    const createProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: CreateProductRequest = {
            name: formState.inputs.name.value,
            category: formState.inputs.category.value,
            userId,
        };
        const res = await sendRequest('/product', 'POST', newProduct, {
            'Content-Type': 'application/json',
        });
        if (!res.isSuccess) {
            setError("Dodawanie produktu nie powiodło się, sprawdź nazwe produktu (nazwa nie może się powtarzać)")
        }

        setIsSuccess(true)

        const newListProduct = [...props.loadedProducts, {...newProduct,id:res.id}] as ProductListResponse;
        props.setLoadedProducts(newListProduct)

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