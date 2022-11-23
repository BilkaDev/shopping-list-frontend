import { useHttpClient } from "./http-hook";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { login as loginAction, logout as logoutAction } from "../Redux/actions/auth";


let autoLogin = true;
export const useAuth = () => {
    const { userId, avatarImg, email, isLoggedIn } = useSelector((store: RootState) => store.auth);
    const { sendRequest, error, clearError, isLoading } = useHttpClient();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            if (autoLogin) {
                autoLogin = !autoLogin;
                const data = await sendRequest("/auth/auto-login");
                if (data.isSuccess) {
                    return login(data.userId, data.email);
                } else clearError();
            }
        })();
    }, []);

    const login = useCallback((userId: string, email: string) => {
        dispatch(loginAction(userId, email));
    }, []);

    const logout = useCallback(() => {
        dispatch(logoutAction());
    }, []);

    return {
        userId,
        avatarImg,
        email,
        login,
        isLoggedIn,
        logout,
        error,
        clearError,
        isLoading,
    };
};