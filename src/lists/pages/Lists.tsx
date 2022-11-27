import { useEffect } from 'react';
import { ListsList } from '../components/List/ListsList';
import { useHttpClient } from '../../common/hooks/http-hook';
import { useDispatch } from 'react-redux';
import { setLists } from '../../common/Redux/actions/list';
import { AddList } from '../components/List/AddList';
import { Section } from '../../common/components/UiElements/Section';
import { InfoModal } from '../../common/components/UiElements/InfoModal';
import { LoadingSpinner } from '../../common/components/UiElements/LoadingSpinner';
import { useAuth } from '../../common/hooks/auth-hook';
import { ApiResponse } from '../../../../shopping-list-BE/src/interfaces/api';
import { GetListsResponse } from '../../../../shopping-list-BE/src/interfaces/list';

export const Lists = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { userId } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!userId) return;
      const loadedProducts: ApiResponse<GetListsResponse> = await sendRequest(
        `/list/${userId}`
      );

      dispatch(
        setLists(
          loadedProducts.status === 200 ? loadedProducts.data : { lists: [] }
        )
      );
    })();
  }, [dispatch, sendRequest, userId]);

  return (
    <Section>
      {error && (
        <InfoModal
          message={error}
          isError
          onClose={clearError}
          title={'Failed!'}
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
