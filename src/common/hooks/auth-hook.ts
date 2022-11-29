import { useHttpClient } from './http-hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import {
  login as loginAction,
  logout as logoutAction,
} from '../Redux/actions/auth';
import { ApiResponse, AuthLogin } from 'interfaces';

let autoLogin = true;
export const useAuth = () => {
  const { userId, avatarImg, email, isLoggedIn } = useSelector(
    (store: RootState) => store.auth
  );
  const { sendRequest, error, clearError, isLoading } = useHttpClient();
  const dispatch = useDispatch();

  const login = useCallback(
    (userId: string, email: string) => {
      dispatch(loginAction(userId, email));
    },
    [dispatch]
  );

  useEffect(() => {
    (async () => {
      if (autoLogin) {
        autoLogin = !autoLogin;
        const res: ApiResponse<AuthLogin> = await sendRequest(
          '/auth/auto-login'
        );
        if (res.status === 200) {
          return login(res.data.user.userId, res.data.user.email);
        } else clearError();
      }
    })();
  }, [clearError, login, sendRequest]);

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

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
