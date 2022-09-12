import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useHttpClient } from "../../hooks/http-hook";
import { useForm } from "../../hooks/form-hook";
import { CreateListRequest, GetListResponse, GetProductResponse, UpdateProductRequest } from "interfaces";
import { editListName } from "../../Redux/actions/list";
import { ManageList } from "../../../lists/components/List/ManageList";
import { editProductAction } from "../../Redux/actions/product";
import { ManageProduct } from "../../../products/components/ManageProduct";
import { Button } from "@chakra-ui/react";
import { InfoModal } from "./InfoModal";


interface Props {
    element: string;
    itemId: string;
    item: GetListResponse | GetProductResponse;
    initialValid: boolean,
    iniitialInputs: {
        name: {
            value: string,
            isValid: boolean,
        }
        category?: {
            value: number,
            isValid: boolean,
        }
    }
}


export const EditItemForm = ({ itemId, item, iniitialInputs, element, initialValid }: Props) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const { isLoading, error, sendRequest, clearError, setError } = useHttpClient();
    const { formState, selectHandler, inputHandler, setFormData } = useForm(iniitialInputs, false);
    const dispatch = useDispatch();

    //@TODO USERID CHANGEIT
    const userId = "user1";

    useEffect(() => {
        setFormData(iniitialInputs, initialValid);
        return () => clearError();
    }, [itemId]);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const editItem: CreateListRequest | UpdateProductRequest = element === "list" ?
            {
                listName: formState.inputs.name.value,
                userId
            } : {
                name: formState.inputs.name.value,
                category: Number(formState.inputs.category.value)
            };
        const path = element === "list" ? `/list/${itemId}` : `/product/${itemId}/${userId}`;

        const res = await sendRequest(path, "PATCH", editItem, {
            "Content-Type": "application/json"
        });
        if (!res.isSuccess) {
            return setError(res?.message ? `Sorry, please try again later.` : `Ops. something went wrong.... check the name ${iniitialInputs.name.value} (can't be repeated)`);
        }
        setIsSuccess(true);
        if (element === "list") {
            dispatch(editListName(item.id, editItem as CreateListRequest));
        } else {
            dispatch(editProductAction(item.id, editItem as UpdateProductRequest));
        }

    };
    //@TODO improve text appearance
    if (isSuccess) {
        return (
            <>
                <p>Update "{iniitialInputs.name.value}" is success.</p>
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
                            name: iniitialInputs.name.value
                        }}
                        initialValid={true}
                    />}
                    {!iniitialInputs.category || <ManageProduct
                        selectHandler={selectHandler}
                        inputHandler={inputHandler}
                        initialValue={{
                            product: iniitialInputs.name.value,
                            category: iniitialInputs.category.value
                        }}
                        initialValid={true}
                    />}
                    <Button disabled={!formState.isValid} type="submit" colorScheme="blue">
                        Update!
                    </Button>
                </form>)
            }
        </>
    );
};
