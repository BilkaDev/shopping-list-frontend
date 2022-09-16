import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useHttpClient } from "../../hooks/http-hook";
import { useForm } from "../../hooks/form-hook";
import {
    CreateListRequest,
    GetListResponse,
    GetProductResponse,
    ItemInListInterface,
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
    item: GetListResponse | GetProductResponse | ItemInListInterface;
    initialValid: boolean,
    initialInputs: {
        name: {
            value: string,
            isValid: boolean,
        }
        category?: {
            value: number,
            isValid: boolean,
        }
        weight?: {
            value: number,
            isValid: boolean,
        }
        count?: {
            value: number,
            isValid: boolean,
        }
    }
}


export const EditItemForm = ({ itemId, item, initialInputs, element, initialValid }: Props) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const { isLoading, error, sendRequest, clearError, setError } = useHttpClient();
    const { formState, selectHandler, inputHandler, setFormData } = useForm(initialInputs, false);
    const dispatch = useDispatch();
    //@TODO USERID CHANGEIT
    const userId = "user1";

    useEffect(() => {
        setFormData(initialInputs, initialValid);
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
                dispatch(editListName(item.id, editItem as CreateListRequest));
                break;
            case "product":
                path = `/product/${itemId}/${userId}`;
                editItem = {
                    name: formState.inputs.name.value,
                    category: Number(formState.inputs.category.value)
                };
                dispatch(editProductAction(item.id, editItem as UpdateProductRequest));
                break;
            case "itemInList":
                path = `/list/item/${itemId}`;
                editItem = {
                    count:  Number(formState.inputs.count.value),
                    weight:  Number(formState.inputs.weight.value),
                    category:  Number(formState.inputs.category.value),
                };
                dispatch(editItemInList(item.id, editItem as UpdateItemInListRequest));
                break;
            default:
                return;
        }
        const res = await sendRequest(path, "PATCH", editItem, {
            "Content-Type": "application/json"
        });
        if (!res.isSuccess) {
            return setError(res?.message ? `Sorry, please try again later.` : `Ops. something went wrong.... check the name ${initialInputs.name.value} (can't be repeated)`);
        }
        setIsSuccess(true);
    };
    if (isSuccess) {
        return (
            <>
                <p>Update "{initialInputs.name.value}" is success.</p>
            </>
        );
    }

    return (
        <>
            {error && <InfoModal isError message={error} onClose={clearError} title={"Failed!"}/>}
            {!isLoading && !error &&
                (<form onSubmit={submitHandler}>
                    {element === "list" && <ManageList
                        inputHandler={inputHandler}
                        initialValue={{
                            name: initialInputs.name.value
                        }}
                        initialValid={true}
                    />}
                    {element === "product" && initialInputs.category !== undefined && <ManageProduct
                        selectHandler={selectHandler}
                        inputHandler={inputHandler}
                        initialValue={{
                            product: initialInputs.name.value,
                            category: initialInputs.category.value
                        }}
                        initialValid={true}
                    />}
                    {element === "itemInList" && initialInputs.category !== undefined && <ManageItemInList
                        selectHandler={selectHandler}
                        inputHandler={inputHandler}
                        initialValue={{
                            product: initialInputs.name.value,
                            category: initialInputs.category.value,
                            count: initialInputs?.count?.value || 0,
                            weight: initialInputs?.weight?.value || 0,
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
