import { LoginRequest } from "interfaces";
import { AuthAction } from "../action-types/auth";

interface AuthState {
    userId: string,
}

interface Login {
    type: AuthAction.LOGIN,
    payload: LoginRequest,
}

const initialState: AuthState = {
    userId: "",
};

type Action =
    | Login

export default (state = initialState, action: Action) => {
    switch (action.type) {
        case AuthAction.LOGIN:
            return {
                ...state,
                userId: action.payload,
            };
        default:
            return state;
    }
}