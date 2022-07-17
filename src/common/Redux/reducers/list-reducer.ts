import {GetItemInList, GetListResponse, GetListsResponse} from "interfaces";
import {ListAction} from "../action-types/list";

export interface ListOfLists {
    listOfLists: GetListsResponse;
    list: GetListResponse;
}
const initialState: ListOfLists = {
    listOfLists: [],
    list: {
        id: '',
        listName: '',
        items: [],
        recipes: [],
    }
};
interface SetLists {
    type: ListAction.SET_LISTS;
    payload: GetListsResponse;
}

interface SetItemsInList {
    type: ListAction.SET_ITEMS_IN_LIST;
    payload: GetListResponse;
}
interface AddList {
    type: ListAction.ADD_TO_LISTS;
    payload: GetListResponse;
}
interface AddItemToList {
    type: ListAction.ADD_ITEM_TO_LIST;
    payload: GetItemInList;
}
interface EditList {
    type: ListAction.EDIT_NAME_LIST;
    payload: GetListResponse;
}
interface DeleteList {
    type: ListAction.DELETE_LIST;
    payload: string;
}
type Action = SetLists | AddList | EditList | DeleteList | SetItemsInList | AddItemToList ;
export default (state: ListOfLists = initialState, action: Action) => {
    switch (action.type) {
        case ListAction.SET_LISTS:
            return {
                ...state,
                listOfLists: action.payload,
            }
        case ListAction.SET_ITEMS_IN_LIST:
            return {
                ...state,
                list: action.payload
            }
        case ListAction.ADD_TO_LISTS:
            return {
            ...state,
                listOfLists: [...state.listOfLists,action.payload]
        }
        case ListAction.ADD_ITEM_TO_LIST:
            return {
                ...state,
                list:{
                    ...state.list,
                    items: [...state.list.items,action.payload]
                }
            }
        case ListAction.EDIT_NAME_LIST:
            const newList = state.listOfLists.map(l => {
                if (l.id === action.payload.id){
                    return action.payload
                } return l
            })
            return {
                ...state,
                listOfLists: newList,
            }
        case ListAction.DELETE_LIST:
           const list = state.listOfLists.filter(list => list.id !== action.payload)
            return {
                ...state,
                listOfLists: list,
            }
        default: return state;
    }
}