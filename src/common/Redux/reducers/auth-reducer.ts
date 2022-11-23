import { AuthAction } from "../action-types/auth";

interface AuthState {
    userId: string,
    email: string;
    avatarImg: string,
    isLoggedIn: boolean,
}

interface Login {
    type: AuthAction.LOGIN,
    payload: { id: string, email: string },
}

interface Logout {
    type: AuthAction.LOGOUT,
}
interface ChangeAvatar {
    type: AuthAction.CHANGE_AVATAR,
}

const initialState: AuthState = {
    userId: "",
    email: "",
    avatarImg: "http://localhost:3002/user/avatar",
    isLoggedIn: false,
};

type Action =
    | Login
    | Logout
    | ChangeAvatar

export default (state = initialState, action: Action) => {
    switch (action.type) {
        case AuthAction.LOGIN:
            return {
                ...state,
                userId: action.payload.id,
                email: action.payload.email,
                isLoggedIn: true,
            };
        case AuthAction.LOGOUT:
            return {
                ...state,
                userId: "",
                email: "",
                isLoggedIn: false,
            };
        case AuthAction.CHANGE_AVATAR:
            return {
                ...state,
                avatarImg: `${state.avatarImg}?${new Date().getTime()}`
            };
        default:
            return state;
    }
}