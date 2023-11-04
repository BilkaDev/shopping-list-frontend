import { useEffect } from 'react';
import { useAppDispatch } from '@/Redux/store';

import { loadRecipesFetch } from '@/Redux/fetch-services/recipes';
import { loadProductsFetch } from '@/Redux/fetch-services/products';
import { useHttpClient } from '@/App/shared/utils/http-hook';

import { useAuthSelector } from '@/Redux/hooks/auth-hook';

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
