import { SendRequestType } from '../../hooks/http-hook';
import { FetchTypes } from './fetch.types';
import { AddAvatarResponse } from 'interfaces';
import { changeAvatar } from '../actions/auth';

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
