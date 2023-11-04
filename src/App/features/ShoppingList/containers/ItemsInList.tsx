import { CloseIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import { Center, Stack, Text, UnorderedList } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ProductCategory } from '@/types';
import { useHttpClient } from '@/App/shared/utils/http-hook';
import { RootState, useAppDispatch } from '@/Redux/store';
import { LoadingSpinner, Section, InfoModal } from '@/App/shared/ui/Page';
import {
  clearBasketFetch,
  loadItemsInListFetch,
} from '@/Redux/fetch-services/list';

import { AddItem } from '../components/ItemInList/AddItem';
import { ItemsList } from '../components/ItemInList/ItemsList';
import { AddRecipeToList } from '../components/ItemsInRecipesList/AddRecipeToList';
import { ItemsInRecipesList } from '../components/ItemsInRecipesList/ItemsInRecipesList';

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

  const recipesIdInList = list.recipes.map(recipe => recipe.id);

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
          <Text fontSize='4xl'>Add product to list</Text>
        </Center>
        <AddItem />
        <AddRecipeToList recipesIdInList={recipesIdInList} />
        <Stack paddingTop='1.5rem' direction='row' spacing={20}>
          <Text fontSize='4xl'>List {name}</Text>
          <Text
            cursor='pointer'
            alignSelf='center'
            onClick={clearBasketHandler}
          >
            Clear basket{' '}
            <button>
              <CloseIcon />
            </button>
          </Text>
        </Stack>
        <div>
          <UnorderedList styleType='none' spacing={6}>
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
