import { useAppDispatch } from '../Redux/store';
import { useEffect } from 'react';
import { loadRecipesFetch } from '../Redux/fetch-services/recipes';
import { loadProductsFetch } from '../Redux/fetch-services/products';
import { useHttpClient } from './http-hook';
import { useAuthSelector } from './auth-hook';

export const useInitialData = () => {
  const dispatch = useAppDispatch();
  const { sendRequest, error, clearError } = useHttpClient();
  const { userId, isLoggedIn } = useAuthSelector();

  useEffect(() => {
    if (!userId) return;
    dispatch(loadProductsFetch(sendRequest));
    dispatch(loadRecipesFetch(userId, sendRequest));
  }, [dispatch, userId, sendRequest]);

  return { error, clearError, isLoggedIn };
};
