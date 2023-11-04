import { useEffect } from 'react';

import { useHttpClient } from '@/App/shared/utils/http-hook';
import { InfoModal, LoadingSpinner, Section } from '@/App/shared/ui/Page';
import { useAuthSelector } from '@/Redux/hooks/auth-hook';
import { loadListFetch } from '@/Redux/fetch-services/list';
import { useAppDispatch } from '@/Redux/store';

import { AddList } from '../components/List/AddList';
import { ListsList } from '../components/List/ListsList';

export const ShoppingList = () => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const { userId } = useAuthSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      dispatch(loadListFetch(userId, sendRequest));
    })();
  }, [dispatch, sendRequest, userId]);

  return (
    <Section>
      {error && (
        <InfoModal
          message={error}
          onClose={clearError}
          title={'Failed!'}
          isError
        />
      )}
      {isLoading && <LoadingSpinner />}
      <h2>Add Shopping List</h2>
      <AddList />
      <h2>Your Shopping Lists!</h2>
      <ListsList />
    </Section>
  );
};
