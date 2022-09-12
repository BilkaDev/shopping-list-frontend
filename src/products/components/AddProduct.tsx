import React, { useState } from "react";
import { ManageProduct } from "./ManageProduct";
import { useForm } from "../../common/hooks/form-hook";
import { CreateProductRequest, GetProductResponse } from "interfaces";
import { useHttpClient } from "../../common/hooks/http-hook";
import { useDispatch } from "react-redux";
import { addProductAction } from "../../common/Redux/actions/product";
import { LoadingSpinner } from "../../common/components/UiElements/LoadingSpinner";
import { InfoModal } from "../../common/components/UiElements/InfoModal";
import { Box, Button, Text, VStack } from "@chakra-ui/react";


export const AddProduct = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const { formState, selectHandler, inputHandler } = useForm({
            name: {
                value: "",
                isValid: false
            },
            category: {
                value: 0,
                isValid: true
            }
        }, false
    );
    const { isLoading, error, sendRequest, clearError, setError } = useHttpClient();
    const dispatch = useDispatch();
    const userId = "user1";

    const createProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: CreateProductRequest = {
            name: formState.inputs.name.value,
            category: Number(formState.inputs.category.value),
            userId
        };
        const res = await sendRequest("/product", "POST", newProduct, {
            "Content-Type": "application/json"
        });
        if (!res.isSuccess) {
            return setError("Adding a product failed, check the product name (name must not repeat)");
        }
        const newProductWithId: GetProductResponse = {
            ...newProduct,
            id: res.id
        };
        setIsSuccess(true);
        dispatch(addProductAction(newProductWithId));
    };

    if (isSuccess) {
        return (
            <Box p={"1rem"} bgColor={"green.500"} borderRadius={"8px"} border={"2px"} borderColor={"green.600"}>
                <Text>Adding the product was successful.</Text>
                <Button onClick={() => setIsSuccess(false)} variant="outline" colorScheme="gray">
                    Add another one
                </Button>
            </Box>
        );
    }

    return (
        <>
            {error &&
                <InfoModal message={error} isError onClose={clearError} title={"Failed!"}/>}
            {isLoading && <LoadingSpinner/>}
            {!isLoading && !error && <form onSubmit={createProduct}>
                <VStack spacing={4} align="flex-start">
                    <ManageProduct selectHandler={selectHandler} inputHandler={inputHandler}/>
                    <Button type="submit" disabled={!formState.isValid} colorScheme="gray" color="var(--dark)">Add
                        product</Button>
                </VStack>
            </form>}
        </>
    );
};