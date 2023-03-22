import { useHttpClient } from './http-hook';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../Redux/store';
import { login as loginAction } from '../Redux/actions/auth';
import { AuthLogin } from '../../types';
import {
  loginFetch,
  logoutFetch,
  singUpFetch,
} from '../Redux/fetch-services/auth';

let autoLogin = true;
export const useAuthSelector = () => {
  const { userId, avatarImg, email, isLoggedIn } = useSelector(
    (store: RootState) => store.auth
  );
  const { sendRequest, isLoading, isSuccess, error, clearError } =
    useHttpClient({
      '400': 'Incorrect login credentials!',
    });
  const dispatch = useAppDispatch();

  const login = useCallback(
    (pwd: string, email: string) => {
      dispatch(loginFetch(email, pwd, sendRequest));
    },
    [sendRequest, dispatch]
  );

  const singUp = useCallback(
    (pwd: string, email: string) => {
      dispatch(singUpFetch(email, pwd, sendRequest));
    },
    [sendRequest, dispatch]
  );

  useEffect(() => {
    (async () => {
      if (autoLogin) {
        autoLogin = !autoLogin;
        const data = await sendRequest<AuthLogin>('/auth/auto-login');
        if (data) {
          dispatch(loginAction(data.user.userId, data.user.email));
        } else clearError();
      }
    })();
  }, [clearError, dispatch, sendRequest]);

  const logout = useCallback(() => {
    dispatch(logoutFetch(sendRequest));
  }, [dispatch, sendRequest]);

  return {
    userId,
    avatarImg,
    email,
    login,
    singUp,
    isLoggedIn,
    logout,
    isSuccess,
    isLoading,
    clearError,
    error,
  };
};
