import React, { useState } from "react";
import { Input } from "../../../common/components/FormElements/Input";
import { VALIDATOR_MAX, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH } from "../../../common/utils/validators";
import { useForm } from "../../../common/hooks/form-hook";
import { useHttpClient } from "../../../common/hooks/http-hook";
import { useDispatch } from "react-redux";
import { SearchProduct } from "./SearchProduct";
import { useParams } from "react-router-dom";
import { CreateProductRequest, CreateItemInListRequest, GetItemInList, GetProductResponse } from "interfaces";
import { addProductAction } from "../../../common/Redux/actions/product";
import { addItemToList } from "../../../common/Redux/actions/list";
import { Button, VStack } from "@chakra-ui/react";
import { InfoModal } from "../../../common/components/UiElements/InfoModal";
import { LoadingSpinner } from "../../../common/components/UiElements/LoadingSpinner";
import { SuccessfullyBox } from "../../../common/components/UiElements/SuccessfullyBox";


export const AddItem = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const { formState, inputHandler, setFormData, selectHandler } = useForm({
            name: { isValid: false, value: "" },
            count: { isValid: false, value: 0 },
            weight: { isValid: false, value: 0 }
        }, false
    );
    const [product, setProduct] = useState<GetProductResponse>();
    const { isLoading, error, sendRequest, clearError, setError } = useHttpClient();
    const dispatch = useDispatch();
    const { id } = useParams();
    const userId = "user1";


    const addItemToListRequest = async (e: React.FormEvent) => {
        e.preventDefault();

        // Create product if product not found
        let newProduct: GetProductResponse | undefined = undefined;
        let newItem: CreateItemInListRequest | undefined = undefined;
        if (!product) {
            const newProductReq: CreateProductRequest = {
                name: formState.inputs.name.value,
                category: Number(formState.inputs.category.value),
                userId,
            };
            const resProduct = await sendRequest("/product", "POST", newProductReq, {
                "Content-Type": "application/json",
            });
            if (!resProduct.isSuccess) {
                return setError("Adding a product failed, check the product name (the name must not repeat)");
            }
            newProduct = {
                ...newProductReq,
                id: resProduct.id,
            };
            dispatch(addProductAction(newProduct));
            newItem = {
                itemId: resProduct.id,
                count: Number(formState.inputs.count.value),
                weight: Number(formState.inputs.weight.value),
                listId: id,
            };
        } else {
            newItem = {
                itemId: product.id,
                count: Number(formState.inputs.count.value),
                weight: Number(formState.inputs.weight.value),
                listId: id,
            };
        }


        const res: any = await sendRequest("/list/item", "POST", newItem, {
            "Content-Type": "application/json",
        });

        if (!res.isSuccess) {
            return setError("Adding a product to the list failed.");
        }

        const newItemTEST: GetItemInList = {
            id: res.id,
            ...newItem,
            product: (product || newProduct) as GetProductResponse,
        };

        dispatch(addItemToList(newItemTEST));
        setIsSuccess(true);
        inputHandler("name", "", false);
    };

    function exitErrorHandler() {
        setFormData({
            name: { isValid: false, value: "" },
            productId: { isValid: true, value: "" },
            count: { isValid: false, value: 0 },
            weight: { isValid: false, value: 0 }
        }, false);
        clearError();
    }

    if (isSuccess) {
        return (
            <SuccessfullyBox text="Adding the product was successful." setIsSuccess={setIsSuccess}/>
        );
    }

    return (
        <>
            {error &&
                <InfoModal message={error} isError onClose={exitErrorHandler} title={"Failed!"}/>}
            {isLoading && <LoadingSpinner/>}
            {!isLoading && !error &&
                <form onSubmit={addItemToListRequest}>
                    <VStack spacing={4} align="flex-start">
                        <Input
                            label="Name"
                            id="name"
                            placeholder="Product name"
                            errorText="Product name is required (min. 2 characters max. 100)."
                            validators={[VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(100)]}
                            onInput={inputHandler}
                            autoCompleteOff
                        />
                        {formState.inputs.name.value.length > 1 && <SearchProduct
                            product={product}
                            setProduct={setProduct}
                            onSelectHandler={selectHandler}
                            name={formState.inputs.name.value}
                        />}
                        <Input
                            label="Count"
                            id="count"
                            placeholder="Count:"
                            errorText="Maximum quantity 1000"
                            validators={[VALIDATOR_MAX(1000)]}
                            initialValue={"0"}
                            initialValid={true}
                            onInput={inputHandler}
                            type="number"
                            min="0"
                            max="1000"
                        />
                        <Input
                            label="Weight"
                            id="weight"
                            placeholder="Weight in grams"
                            errorText="Maximum weight 1000000"
                            validators={[VALIDATOR_MAX(1000000)]}
                            onInput={inputHandler}
                            initialValid={true}
                            initialValue={"0"}
                            type="number"
                            min="0"
                            max="1000000"
                        />
                        <Button type="submit" disabled={!formState.isValid} colorScheme="gray"
                                color="var(--dark)">Add to list</Button>
                    </VStack>
                </form>}
        </>
    );
};