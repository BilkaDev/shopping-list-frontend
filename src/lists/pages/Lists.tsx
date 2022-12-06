import { useEffect } from 'react';
import { ListsList } from '../components/List/ListsList';
import { useHttpClient } from '../../common/hooks/http-hook';
import { AddList } from '../components/List/AddList';
import { Section } from '../../common/components/UiElements/Section';
import { InfoModal } from '../../common/components/UiElements/InfoModal';
import { LoadingSpinner } from '../../common/components/UiElements/LoadingSpinner';
import { useAuthSelector } from '../../common/hooks/auth-hook';
import { loadListFetch } from '../../common/Redux/fetch-services/list';
import { useAppDispatch } from '../../common/Redux/store';

export const Lists = () => {
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
