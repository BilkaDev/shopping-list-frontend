import React, {useState} from 'react';
import {Input} from "../../../common/components/FormElements/Input";
import {VALIDATOR_MAX, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH} from "../../../common/utils/validators";
import {useForm} from "../../../common/hooks/form-hook";
import {useHttpClient} from "../../../common/hooks/http-hook";
import {useDispatch} from "react-redux";
import {SearchProduct} from "./SearchProduct";
import {useParams} from "react-router-dom";
import {CreateProductRequest, CreateItemInListRequest, GetItemInList, GetProductResponse} from 'interfaces';
import {addProductAction} from "../../../common/Redux/actions/product";
import {addItemToList} from "../../../common/Redux/actions/list";


export const AddItem = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const {formState, inputHandler, setFormData, selectHandler} = useForm({
            name: {isValid: false, value: ""},
            count: {isValid: false, value: 0},
            weight: {isValid: false, value: 0}
        }, false
    );
    const [product, setProduct] = useState<GetProductResponse>();
    const {isLoading, error, sendRequest, clearError, setError} = useHttpClient();
    const dispatch = useDispatch();
    const {id} = useParams();
    const userId = 'user1';


    const addItemToListRequest = async (e: React.FormEvent) => {
        e.preventDefault();


        // Create product if product not found
        let newProduct: GetProductResponse | undefined = undefined;
        let newItem: CreateItemInListRequest | undefined = undefined
        if (!product) {
            const newProductReq: CreateProductRequest = {
                name: formState.inputs.name.value,
                category: Number(formState.inputs.category.value),
                userId,
            };
            const resProduct = await sendRequest('/product', 'POST', newProductReq, {
                'Content-Type': 'application/json',
            });
            if (!resProduct.isSuccess) {
                return setError("Dodawanie produktu nie powiodło się, sprawdź nazwe produktu (nazwa nie może się powtarzać)");
            }
            newProduct = {
                ...newProductReq,
                id: resProduct.id,
            };
            dispatch(addProductAction(newProduct));
            newItem ={
                itemId: resProduct.id,
                count: Number(formState.inputs.count.value),
                weight: Number(formState.inputs.weight.value),
                listId: id,
            };
        } else {
            newItem ={
                itemId: product.id,
                count: Number(formState.inputs.count.value),
                weight: Number(formState.inputs.weight.value),
                listId: id,
            };
        }


        const res: any = await sendRequest('/list/item', 'POST', newItem, {
            'Content-Type': 'application/json',
        });

        if (!res.isSuccess) {
            return setError("Dodawanie produktu do listy nie powiodło się.");
        }

        const newItemTEST: GetItemInList = {
            id: res.id,
           ...newItem,
            product: (product || newProduct) as GetProductResponse,
        };

        dispatch(addItemToList(newItemTEST))
        setIsSuccess(true);
        inputHandler('name', '', false);
    };

    function exitErrorHandler() {
        setFormData({
            name: {isValid: false, value: ""},
            productId: {isValid: true, value: ""},
            count: {isValid: false, value: 0},
            weight: {isValid: false, value: 0}
        }, false);
        clearError();
    }


    //@TODO improve text appearance
    //@TODO Add product btn
    if (isSuccess) {
        return (
            <>
                <p>Dodanie produktu do listy powiodło się.</p>
                <button onClick={() => setIsSuccess(false)}>Dodaj kolejny produkty</button>
            </>
        );
    }

    //@TODO fix the appearance of an error or add a modal
    return (
        <>
            {error && (<>
                    <p>{error}</p>
                    <button onClick={exitErrorHandler}>Zamknij</button>
                </>
            )}
            {isLoading && <p>Loading</p>}
            {!isLoading && !error && <form onSubmit={addItemToListRequest}>
                <Input
                    label="Nazwa"
                    id="name"
                    placeholder="Nazwa produktu"
                    errorText="Nazwa produktu jest wymagana (min. 2 znaki max. 100)."
                    validators={[VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(100)]}
                    onInput={inputHandler}
                />
                <SearchProduct
                    product={product}
                    setProduct={setProduct}
                    onInputHandler={inputHandler}
                    onSelectHandler={selectHandler}
                    name={formState.inputs.name.value}
                />
                <Input
                    label="Ilość"
                    id="count"
                    placeholder="Ilość"
                    errorText="Maksymalna ilość 1000"
                    validators={[VALIDATOR_MAX(1000)]}
                    initialValue={"0"}
                    initialValid={true}
                    onInput={inputHandler}
                    type="number"
                    min="0"
                    max="1000"
                />
                <Input
                    label="Waga"
                    id="weight"
                    placeholder="Waga"
                    errorText="Maksymalna waga 1000000"
                    validators={[VALIDATOR_MAX(1000000)]}
                    onInput={inputHandler}
                    initialValid={true}
                    initialValue={"0"}
                    type="number"
                    min="0"
                    max="1000000"

                />
                <button disabled={!formState.isValid}>Dodaj do listy</button>
            </form>}

        </>
    );
};