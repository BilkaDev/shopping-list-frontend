import { ProductCategory } from 'interfaces';
import { useEffect } from 'react';
import { ItemsList } from '../components/ItemInList/ItemsList';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHttpClient } from '../../common/hooks/http-hook';
import { AddItem } from '../components/ItemInList/AddItem';
import { RootState, useAppDispatch } from '../../common/Redux/store';
import { InfoModal } from '../../common/components/UiElements/modals/InfoModal';
import { LoadingSpinner } from '../../common/components/UiElements/LoadingSpinner';
import { Section } from '../../common/components/UiElements/Section';
import { Center, Stack, Text, UnorderedList } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { AddRecipeToList } from '../components/ItemsInRecipesList/AddRecipeToList';
import { ItemsInRecipesList } from '../components/ItemsInRecipesList/ItemsInRecipesList';
import {
  clearBasketFetch,
  loadItemsInListFetch,
} from '../../common/Redux/fetch-services/list';

export const ItemsInList = () => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const { id, name } = useParams();
  const dispatch = useAppDispatch();
  const entries = Object.entries(ProductCategory);
  const category: string[] = [];
  const { list } = useSelector((store: RootState) => store.lists);
  useEffect(() => {
    if (!id) return;
    dispatch(loadItemsInListFetch(id, sendRequest));
  }, [dispatch, id, sendRequest]);

  for (const key of entries) {
    if (typeof key[1] === 'number') {
      category.push(key[0]);
    }
  }

  async function clearBasketHandler() {
    if (id === undefined) return;
    dispatch(clearBasketFetch(id, sendRequest));
  }

  return (
    <>
      {error && (
        <InfoModal
          message={error}
          onClose={clearError}
          title={'Failed!'}
          isError
        />
      )}
      {isLoading && <LoadingSpinner />}
      <Section>
        <Center>
          <Text fontSize="4xl">Add product to list</Text>
        </Center>
        <AddItem />
        <AddRecipeToList />
        <Stack paddingTop="1.5rem" direction="row" spacing={20}>
          <Text fontSize="4xl">List {name}</Text>
          <Text
            cursor="pointer"
            alignSelf="center"
            onClick={clearBasketHandler}
          >
            Clear basket{' '}
            <button>
              <CloseIcon />
            </button>
          </Text>
        </Stack>
        <div>
          <UnorderedList styleType="none" spacing={6}>
            {category.map((category, id) => (
              <ItemsList
                key={id}
                categoryId={id}
                list={list}
                categoryName={category}
              />
            ))}
          </UnorderedList>
        </div>
        <ItemsInRecipesList
          listId={id as string}
          recipes={list.recipes}
          category={category}
        />
      </Section>
    </>
  );
};
