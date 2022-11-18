import { AuthAction } from "../action-types/auth";

interface AuthState {
    userId: string,
    email: string;
}

interface Login {
    type: AuthAction.LOGIN,
    payload: { id: string, email: string },
}

interface Logout {
    type: AuthAction.LOGOUT,
}

const initialState: AuthState = {
    userId: "",
    email: "",
};

type Action =
    | Login
    | Logout

export default (state = initialState, action: Action) => {
    switch (action.type) {
        case AuthAction.LOGIN:
            return {
                ...state,
                userId: action.payload.id,
                email: action.payload.email,
            };
        case AuthAction.LOGOUT:
            return {
                ...state,
                userId: "",
                email: "",
            };
        default:
            return state;
    }
}