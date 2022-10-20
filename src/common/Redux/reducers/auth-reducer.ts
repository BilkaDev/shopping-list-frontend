import { LoginRequest } from "interfaces";
import { AuthAction } from "../action-types/auth";

interface AuthState {
    userId: string,
}

interface Login {
    type: AuthAction.LOGIN,
    payload: LoginRequest,
}

interface Logout {
    type: AuthAction.LOGOUT,
}

const initialState: AuthState = {
    userId: "",
};

type Action =
    | Login
    | Logout

export default (state = initialState, action: Action) => {
    switch (action.type) {
        case AuthAction.LOGIN:
            return {
                ...state,
                userId: action.payload,
            };
        case AuthAction.LOGOUT:
            return {
                ...state,
                userId: "",
            };
        default:
            return state;
    }
}