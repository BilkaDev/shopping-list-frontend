import React, {useEffect} from 'react';
import './Lists.css'
import {ListsList} from "../components/List/ListsList";
import {useHttpClient} from "../../common/hooks/http-hook";
import {useDispatch} from "react-redux";
import {setLists} from "../../common/Redux/actions/list";
import {AddList} from "../components/List/AddList";

export const Lists = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const dispatch = useDispatch()
    const userId = 'user1';

    useEffect(() => {
        (async () => {
                const loadedProducts = await sendRequest(`/list/${userId}`);
                dispatch(setLists(loadedProducts));
            }
        )();
    }, []);

    //@TODO added error modal
    //@TODO added loading spinner

    return (
        <div className="Lists section">
            <h2>Dodaj Liste zakupów</h2>
            <AddList/>
            <h2>Twoje Listy zakupów!</h2>
            <ListsList/>
        </div>
    );
};