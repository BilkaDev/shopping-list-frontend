import { CreateListRequest, GetItemInList, GetListResponse, GetListsResponse } from "interfaces";
import { ListAction } from "../action-types/list";

export const setLists = (lists: GetListsResponse) => ({
    type: ListAction.SET_LISTS,
    payload: lists
});
export const setItemsInList = (list: GetListResponse) => ({
    type: ListAction.SET_ITEMS_IN_LIST,
    payload: list
});

export const addList = (list: GetListResponse) => ({
    type: ListAction.ADD_TO_LISTS,
    payload: list
});
export const addItemToList = (item: GetItemInList) => ({
    type: ListAction.ADD_ITEM_TO_LIST,
    payload: item
});
export const editListName = (id: string, list: CreateListRequest) => ({
    type: ListAction.EDIT_NAME_LIST,
    payload: { ...list, id }
});
export const deleteList = (listId: string) => ({
    type: ListAction.DELETE_LIST,
    payload: listId
});
export const addItemToBasket = (itemId: string) => ({
    type: ListAction.ADD_ITEM_TO_BASKET,
    payload: itemId
});
export const removeFromBasket = (itemId: string) => ({
    type: ListAction.REMOVE_FROM_BASKET,
    payload: itemId
});
export const clearBasket = (listId: string) => ({
    type: ListAction.CLEAR_BASKET,
    payload: listId
});