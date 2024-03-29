import {
  ItemInListInterface,
  ListInterface,
  ListFilter,
  RecipeInterface,
  UpdateItemInListRequest,
} from '@/types';
import { ListAction } from '../action-types/list';

export interface ListOfLists {
  listOfLists: ListFilter[];
  list: ListInterface;
}

const initialState: ListOfLists = {
  listOfLists: [],
  list: {
    id: '',
    listName: '',
    items: [],
    recipes: [],
  },
};

interface SetLists {
  type: ListAction.SET_LISTS;
  payload: ListFilter[];
}

interface AddList {
  type: ListAction.ADD_TO_LISTS;
  payload: ListInterface;
}

interface EditList {
  type: ListAction.EDIT_NAME_LIST;
  payload: ListInterface;
}

interface DeleteList {
  type: ListAction.DELETE_LIST;
  payload: string;
}

/*ITEMS IN LIST*/
interface SetItemsInList {
  type: ListAction.SET_ITEMS_IN_LIST;
  payload: ListInterface;
}

interface AddItemToList {
  type: ListAction.ADD_ITEM_TO_LIST;
  payload: ItemInListInterface;
}

interface RemoveItemFromList {
  type: ListAction.REMOVE_ITEM_FROM_LIST;
  payload: string;
}

interface EditItemInListPayload extends UpdateItemInListRequest {
  id: string;
  category: number;
}

interface EditItemInList {
  type: ListAction.EDIT_ITEM_IN_LIST;
  payload: EditItemInListPayload;
}

/*ITEMS IN BASKET*/
interface AddItemToBasket {
  type: ListAction.ADD_ITEM_TO_BASKET;
  payload: string;
}

interface RemoveFromBasket {
  type: ListAction.REMOVE_FROM_BASKET;
  payload: string;
}

interface ClearBasket {
  type: ListAction.CLEAR_BASKET;
  payload: string;
}

/*RECIPE TO LIST*/
interface AddRecipeToList {
  type: ListAction.ADD_RECIPE_TO_LIST;
  payload: RecipeInterface;
}

interface DeleteRecipeFromList {
  type: ListAction.DELETE_RECIPE_FROM_LIST;
  payload: string;
}

type Action =
  | SetLists
  | AddList
  | EditList
  | DeleteList
  | SetItemsInList
  | AddItemToList
  | AddItemToBasket
  | RemoveFromBasket
  | ClearBasket
  | RemoveItemFromList
  | EditItemInList
  | DeleteRecipeFromList
  | AddRecipeToList;

export const listReducer = (
  state: ListOfLists = initialState,
  action: Action
) => {
  switch (action.type) {
    case ListAction.SET_LISTS:
      return {
        ...state,
        listOfLists: action.payload,
      };
    case ListAction.SET_ITEMS_IN_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case ListAction.ADD_TO_LISTS:
      return {
        ...state,
        listOfLists: [...state.listOfLists, action.payload],
      };
    case ListAction.EDIT_NAME_LIST:
      const newList = state.listOfLists.map(l => {
        if (l.id === action.payload.id) {
          return action.payload;
        }
        return l;
      });
      return {
        ...state,
        listOfLists: newList,
      };
    case ListAction.DELETE_LIST:
      const list = state.listOfLists.filter(list => list.id !== action.payload);
      return {
        ...state,
        listOfLists: list,
      };
    case ListAction.ADD_ITEM_TO_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          items: [...state.list.items, action.payload],
        },
      };
    case ListAction.REMOVE_ITEM_FROM_LIST:
      const removeItemInList = state.list.items.filter(
        item => item.id !== action.payload
      );
      return {
        ...state,
        list: {
          ...state.list,
          items: removeItemInList,
        },
      };
    case ListAction.EDIT_ITEM_IN_LIST:
      const { count, weight, category } = action.payload;
      const editItemInList = state.list.items.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            count,
            weight,
            product: {
              ...item.product,
              category,
            },
          };
        } else return item;
      });
      return {
        ...state,
        list: {
          ...state.list,
          items: [...editItemInList],
        },
      };

    case ListAction.ADD_ITEM_TO_BASKET:
      const items = state.list.items.map(item => {
        if (item.id === action.payload) {
          const newItem = { ...item };
          newItem.itemInBasket = true;
          return newItem;
        } else {
          return item;
        }
      });
      return {
        ...state,
        list: {
          ...state.list,
          items,
        },
      };
    case ListAction.REMOVE_FROM_BASKET:
      const items1 = state.list.items.map(item => {
        if (item.id === action.payload) {
          const newItem = { ...item };
          newItem.itemInBasket = false;
          return newItem;
        } else {
          return item;
        }
      });
      return {
        ...state,
        list: {
          ...state.list,
          items: items1,
        },
      };
    case ListAction.CLEAR_BASKET:
      const clearBasketList = [...state.list.items].map(item => {
        const newItem = { ...item };
        newItem.itemInBasket = false;
        return newItem;
      });
      const clearBasketRecipes = state.list.recipes.map(recipe => {
        const items = recipe.items.map(item => ({
          ...item,
          itemInBasket: false,
        }));

        return { ...recipe, items };
      });

      return {
        ...state,
        list: {
          ...state.list,
          items: clearBasketList,
          recipes: clearBasketRecipes,
        },
      };
    case ListAction.ADD_RECIPE_TO_LIST:
      const checkRecipes = state.list.recipes.findIndex(
        recipe => recipe.id === action.payload.id
      );
      if (checkRecipes !== -1) return state;
      const addRecipeToList = [...state.list.recipes, action.payload];
      return {
        ...state,
        list: {
          ...state.list,
          recipes: addRecipeToList,
        },
      };
    case ListAction.DELETE_RECIPE_FROM_LIST:
      const deleteRecipeFromList = state.list.recipes.filter(
        recipe => recipe.id !== action.payload
      );
      return {
        ...state,
        list: {
          ...state.list,
          recipes: deleteRecipeFromList,
        },
      };
    default:
      return state;
  }
};
