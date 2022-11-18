import { AuthAction } from "../action-types/auth";

export const login = (id: string, email: string) => ({
    type: AuthAction.LOGIN,
    payload: {id, email,},
});

export const logout = () => ({
    type: AuthAction.LOGOUT,
});
export const changeAvatar = () => ({
    type: AuthAction.CHANGE_AVATAR,
});