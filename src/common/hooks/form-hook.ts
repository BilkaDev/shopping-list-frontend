import {useCallback, useReducer} from "react";


type State = {
    inputs: List | Product;
    isValid: boolean
}

interface Product  {
    [key: string]: { value: string | number, isValid: boolean };
    name: { value: string, isValid: boolean };
    category: { value: number, isValid: boolean };
}
interface List  {
    [key: string]: { value: string | number, isValid: boolean };
    name: { value: string, isValid: boolean };
}

type Action = | { type: 'SELECT_CHANGE'; inputId: string; value: number; isValid: boolean; }
    | { type: 'INPUT_CHANGE'; inputId: string; value: string; isValid: boolean; }
    | { type: 'SET_DATA'; inputs: Product | List; formIsValid: boolean; }


enum ActionTypes {
    SELECT_CHANGE = 'SELECT_CHANGE',
    INPUT_CHANGE = 'INPUT_CHANGE',
    SET_DATA = 'SET_DATA',
}

const formReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionTypes.SELECT_CHANGE:
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid}
                }
            };
        case ActionTypes.SET_DATA:
            return {
                inputs: action.inputs,
                isValid: action.formIsValid,
            };
        case ActionTypes.INPUT_CHANGE:
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) {
                    continue;
                }
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            };
        default:
            return state;
    }
};


export const useForm = (initialInputs: Product | List, InitialFormValidate: boolean) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: InitialFormValidate,
    });

    const selectHandler = useCallback((id: string, value: number, isValid: boolean) => {
        dispatch({
            type: ActionTypes.SELECT_CHANGE,
            inputId: id,
            value,
            isValid
        });
    }, []);

    const inputHandler = useCallback((id: string, value: string, isValid: boolean) => {
        dispatch({
            type: ActionTypes.INPUT_CHANGE,
            inputId: id,
            value,
            isValid

        });
    }, []);
    const setFormData = useCallback((inputData: Product | List, formValidity: boolean) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formIsValid: formValidity
        });
    }, []);

    return {
        formState,
        selectHandler,
        inputHandler,
        setFormData,
    };

};
