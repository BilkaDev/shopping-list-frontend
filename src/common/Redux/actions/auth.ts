import { AuthAction } from "../action-types/auth";

export const login = (id: string) => ({
    type: AuthAction.LOGIN,
    payload: id,
});

export const logout = () => ({
    type: AuthAction.LOGOUT,
});