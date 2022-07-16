import React, {useState} from 'react';
import {ManageList} from "./ManageList";
import {CreateListRequest, CreateListResponse, GetListResponse} from 'interfaces';
import {useForm} from "../../../common/hooks/form-hook";
import {useHttpClient} from "../../../common/hooks/http-hook";
import {useDispatch} from "react-redux";
import {addList} from "../../../common/Redux/actions/list";





export const AddList = () => {
    const [isSuccess,setIsSuccess] = useState(false)
    const {formState, inputHandler} = useForm({
            name: {isValid: false, value: ""}
        }, false
    );
    const {isLoading, error, sendRequest, clearError,setError} = useHttpClient();
    const dispatch = useDispatch();
    const userId = 'user1';

    const addListToLists = async (e: React.FormEvent) => {
        e.preventDefault();

        const newList: CreateListRequest = {
            listName: formState.inputs.name.value,
            userId,
        };
        const res:CreateListResponse = await sendRequest('/list', 'POST', newList, {
            'Content-Type': 'application/json',
        });
        if (!res.isSuccess) {
            return setError("Dodawanie listy nie powiodło się, sprawdź nazwe produktu (nazwa nie może się powtarzać)")
        }
        const newListWithId: GetListResponse = {
            id: res.id,
            listName: newList.listName,
            items: [],
            recipes: []
        }
        dispatch(addList(newListWithId))
        setIsSuccess(true)
    };

    //@TODO improve text appearance
    //@TODO Add product btn
    if (isSuccess){
        return (
            <>
                <p>Dodanie Listy powiodło się.</p>
                <button onClick={()=>setIsSuccess(false)}>Dodaj produkty</button>
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
            {!isLoading && !error && <form onSubmit={addListToLists}>
                <ManageList inputHandler={inputHandler}/>
                <button disabled={!formState.isValid}>Dodaj liste</button>
            </form>}

        </>
    );
};