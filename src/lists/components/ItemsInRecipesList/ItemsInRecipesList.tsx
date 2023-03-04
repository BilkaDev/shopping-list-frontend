import { Stack, Text, UnorderedList } from '@chakra-ui/react';
import { ItemsList } from '../ItemInList/ItemsList';
import { DeleteIcon } from '@chakra-ui/icons';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { InfoModal } from '../../../common/components/UiElements/modals/InfoModal';
import { ItemsInRecipesListProps } from '../../lists.types';
import { useAppDispatch } from '../../../common/Redux/store';
import { removeRecipeForListFetch } from '../../../common/Redux/fetch-services/list';

export function ItemsInRecipesList({
  recipes,
  category,
  listId,
}: ItemsInRecipesListProps) {
  const dispatch = useAppDispatch();
  const { error, sendRequest, clearError } = useHttpClient({
    all: 'Something went wrong when deleting the recipe. Please try again later.',
  });

  function deleteItemHandler(recipeId: string, listId: string) {
    dispatch(removeRecipeForListFetch(listId, recipeId, sendRequest));
  }

  const list = recipes.map(recipe => (
    <div key={recipe.id}>
      <Stack
        direction="row"
        paddingTop="1.5rem"
        justifyContent="space-between"
        align="center"
      >
        <Text fontSize="4xl">Recipe {recipe.name}</Text>
        <button onClick={() => deleteItemHandler(recipe.id, listId)}>
          <DeleteIcon />
        </button>
      </Stack>
      <div>
        <UnorderedList styleType="none" spacing={6}>
          {category.map((category, id) => (
            <ItemsList
              key={id}
              categoryId={id}
              list={recipe}
              categoryName={category}
              isRecipe={true}
            />
          ))}
        </UnorderedList>
      </div>
    </div>
  ));
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
      {list}
    </>
  );
}
