import { SendRequestType } from '@/App/shared/utils/http-hook';
import { FetchTypes } from './fetch.types';
import { AddAvatarResponse, AuthLogin, RegisterUserResponse } from '@/types';
import {
  changeAvatar,
  login as loginAction,
  logout as logoutAction,
} from '../actions/auth';

export const changeAvatarFetch =
  (
    image: FormData,
    sendRequest: SendRequestType
  ): FetchTypes<Promise<AddAvatarResponse | void>> =>
  async dispatch => {
    const data = await sendRequest<AddAvatarResponse>(
      '/user/avatar',
      'POST',
      image,
      {}
    );
    if (data) {
      dispatch(changeAvatar());
      return data;
    }
  };

export const loginFetch =
  (email: string, pwd: string, sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    const data = await sendRequest<AuthLogin>('/auth/login', 'POST', {
      email,
      pwd,
    });
    if (data) {
      dispatch(loginAction(data.user.userId, data.user.email));
    }
  };

export const singUpFetch =
  (email: string, pwd: string, sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    const data = await sendRequest<RegisterUserResponse>('/user', 'POST', {
      email,
      pwd,
    });
    if (data) {
      dispatch(loginFetch(email, pwd, sendRequest));
    }
  };

export const logoutFetch =
  (sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    const data = await sendRequest('/auth/logout', 'POST');
    if (data) {
      dispatch(logoutAction());
    }
  };

export const testLoginFetch =
  (sendRequest: SendRequestType): FetchTypes =>
  async dispatch => {
    const data = await sendRequest<AuthLogin>('/auth/test-login', 'GET');
    if (data) {
      dispatch(loginAction(data.user.userId, data.user.email));
    }
  };
