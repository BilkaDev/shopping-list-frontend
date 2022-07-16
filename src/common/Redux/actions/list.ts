import {CreateListRequest, GetListResponse, GetListsResponse } from "interfaces"
import { ListAction } from "../action-types/list"

export const setLists = (lists:GetListsResponse) => ({
    type: ListAction.SET_LISTS,
    payload: lists
})

export const addList= (list:GetListResponse) => ({
    type: ListAction.ADD_TO_LISTS,
    payload: list
})
export const editListName = (id:string,list:CreateListRequest) => ({
    type: ListAction.EDIT_NAME_LIST,
    payload: {...list,id}
})
export const deleteList = (listId:string) => ({
    type: ListAction.DELETE_LIST,
    payload: listId
})