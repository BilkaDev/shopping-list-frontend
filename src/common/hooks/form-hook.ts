import {useCallback, useReducer} from "react";

const formReducer = (state: any, action: any) => {
    switch (action.type) {
        case "SELECT_CHANGE":
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid}
                }
            };
        case "INPUT_CHANGE":
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
export const useForm = (initialInputs: { name: { value: string, isValid: boolean }, category: { value: number, isValid: boolean } }, InitialFormValidate: boolean) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: InitialFormValidate,
    });

    const selectHandler = useCallback((id: string, value: number, isValid: boolean) => {
        dispatch({
            type: 'SELECT_CHANGE',
            inputId: id,
            value,
            isValid

        });
    }, []);

    const inputHandler = useCallback((id: string, value: string, isValid: boolean) => {
        dispatch({
            type: 'INPUT_CHANGE',
            inputId: id,
            value,
            isValid

        });
    }, []);

    return {
        formState,
        selectHandler,
        inputHandler,
    };

};
