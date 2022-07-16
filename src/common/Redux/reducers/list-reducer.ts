import { GetListResponse, GetListsResponse} from "interfaces";
import {ListAction} from "../action-types/list";

export interface ListOfLists {
    listOfLists: GetListsResponse;
}
const initialState: ListOfLists = {
    listOfLists: []
};
interface SetLists {
    type: ListAction.SET_LISTS;
    payload: GetListsResponse;
}
interface AddList {
    type: ListAction.ADD_TO_LISTS;
    payload: GetListResponse;
}
interface EditList {
    type: ListAction.EDIT_NAME_LIST;
    payload: GetListResponse;
}
interface DeleteList {
    type: ListAction.DELETE_LIST;
    payload: string;
}
type Action = SetLists | AddList | EditList | DeleteList;
export default (state: ListOfLists = initialState, action: Action) => {
    switch (action.type) {
        case ListAction.SET_LISTS:
            return {
                ...state,
                listOfLists: action.payload
            }
        case ListAction.ADD_TO_LISTS:
            return {
            ...state,
                listOfLists: [...state.listOfLists,action.payload]
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