import {GetListResponse, ProductCategory} from 'interfaces';
import React, {useEffect, useState} from 'react';
import {ItemsList} from "../components/ItemInList/ItemsList";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setItemsInList} from "../../common/Redux/actions/list";
import {useHttpClient} from "../../common/hooks/http-hook";

export const ItemsInList = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [list,setList] = useState<GetListResponse>()
    const {id,name} = useParams()
    const dispatch = useDispatch()
    const entries = Object.entries(ProductCategory);
    const category = [];

    useEffect(() => {
        (async () => {
           const list = await sendRequest(`/list/user/${id}`)
            dispatch(setItemsInList(list))
            setList(list)
        })()
    },[id])

    for (const key of entries) {
        if (typeof key[1] === 'number') {
            category.push(key[0]);
        }
    }

    //@TODO added error modal
    //@TODO added loading spinner
    if (list === undefined || isLoading){
        return <p>Loading...</p>
    }
    return (
        <div className="section">
            <h2>Dodaj produkt do listy</h2>
            <h2>Lista {name}</h2>
            <div>
                <ul>
                    {category.map((category, id) => (<ItemsList
                        key={id}
                        categoryId={id}
                        list={list}
                        categoryName={category}
                    />))}
                </ul>
            </div>
        </div>
    );
};