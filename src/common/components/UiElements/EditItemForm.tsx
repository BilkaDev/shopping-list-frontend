import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useHttpClient } from "../../hooks/http-hook";
import { useForm } from "../../hooks/form-hook";
import {
    CreateListRequest,
    UpdateProductRequest,
    UpdateItemInListRequest,
} from "interfaces";
import { editItemInList, editListName } from "../../Redux/actions/list";
import { ManageList } from "../../../lists/components/List/ManageList";
import { editProductAction } from "../../Redux/actions/product";
import { ManageProduct } from "../../../products/components/ManageProduct";
import { Button } from "@chakra-ui/react";
import { InfoModal } from "./InfoModal";
import { ManageItemInList } from "../../../lists/components/ItemInList/ManageItemInList";


interface Props {
    element: string;
    itemId: string;
    initialValid: boolean,
    initialInputs: {
        name: string,
        category?: number,
        weight?: number,
        count?: number,
    }
}


export const EditItemForm = ({ itemId, initialInputs, element, initialValid }: Props) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const { isLoading, error, sendRequest, clearError, setError } = useHttpClient();

    const initialInputsForm = {
        name: {
            value: initialInputs.name,
            isValid: true,
        },
        category: {
            value: initialInputs?.category || 0,
            isValid: true,
        },
        weight: {
            value: initialInputs?.weight || 0,
            isValid: true,
        },
        count: {
            value: initialInputs?.count || 0,
            isValid: true,
        }
    };
    const { formState, selectHandler, inputHandler, setFormData } = useForm(initialInputsForm, false);
    const dispatch = useDispatch();
    //@TODO USERID CHANGEIT
    const userId = "user1";

    useEffect(() => {
        setFormData(initialInputsForm, initialValid);
        return () => clearError();
    }, [itemId]);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let editItem:
            | CreateListRequest
            | UpdateProductRequest
            | UpdateItemInListRequest
            | undefined = undefined;
        let path = "";

        switch (element) {
            case "list":
                editItem = {
                    listName: formState.inputs.name.value,
                    userId
                };
                path = `/list/${itemId}`;
                dispatch(editListName(itemId, editItem as CreateListRequest));
                break;
            case "product":
                path = `/product/${itemId}/${userId}`;
                editItem = {
                    name: formState.inputs.name.value,
                    category: Number(formState.inputs.category.value)
                };
                dispatch(editProductAction(itemId, editItem as UpdateProductRequest));
                break;
            case "itemInList":
                path = `/list/item/${itemId}`;
                editItem = {
                    count: Number(formState.inputs.count.value),
                    weight: Number(formState.inputs.weight.value),
                    category: Number(formState.inputs.category.value),
                };
                dispatch(editItemInList(itemId, editItem as UpdateItemInListRequest));
                break;
            default:
                return;
        }
        const res = await sendRequest(path, "PATCH", editItem, {
            "Content-Type": "application/json"
        });
        if (!res.isSuccess) {
            return setError(res?.message ? `Sorry, please try again later.` : `Ops. something went wrong.... check the name ${initialInputs.name} (can't be repeated)`);
        }
        setIsSuccess(true);
    };
    if (isSuccess) {
        return (
            <>
                <p>Update "{initialInputs.name}" is success.</p>
            </>
        );
    }

    return (
        <>
            {error && <InfoModal isError message={error} onClose={clearError} title={"Failed!"}/>}
            {!isLoading && !error &&
                (<form onSubmit={submitHandler}>
                    {(element === "list" || element === "recipe") && <ManageList
                        inputHandler={inputHandler}
                        initialValue={{
                            name: initialInputs.name
                        }}
                        initialValid={true}
                    />}
                    {element === "product" && initialInputs.category !== undefined && <ManageProduct
                        selectHandler={selectHandler}
                        inputHandler={inputHandler}
                        initialValue={{
                            product: initialInputs.name,
                            category: initialInputs.category
                        }}
                        initialValid={true}
                    />}
                    {element === "itemInList" && initialInputs.category !== undefined && <ManageItemInList
                        selectHandler={selectHandler}
                        inputHandler={inputHandler}
                        initialValue={{
                            product: initialInputs.name,
                            category: initialInputs.category,
                            count: initialInputs?.count || 0,
                            weight: initialInputs?.weight || 0,
                        }}
                    />}
                    <Button disabled={!formState.isValid} type="submit" colorScheme="blue">
                        Update!
                    </Button>
                </form>)
            }
        </>
    );
};
