import { Stack, Text, UnorderedList } from '@chakra-ui/react';
import { DeleteRecipeFromListResponse } from 'interfaces';
import { ItemsList } from '../ItemInList/ItemsList';
import { DeleteIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { deleteRecipeFromList } from '../../../common/Redux/actions/list';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { InfoModal } from '../../../common/components/UiElements/InfoModal';
import { ItemsInRecipesListProps } from '../../lists.types';

export function ItemsInRecipesList({
  recipes,
  category,
  listId,
}: ItemsInRecipesListProps) {
  const dispatch = useDispatch();
  const { error, sendRequest, clearError } = useHttpClient({
    all: 'Something went wrong when deleting the recipe. Please try again later.',
  });

  async function deleteItemHandler(recipeId: string, listId: string) {
    const data = await sendRequest<DeleteRecipeFromListResponse>(
      `/list/delete-recipe/${listId}/${recipeId}`,
      'DELETE'
    );
    if (data) {
      dispatch(deleteRecipeFromList(recipeId));
    }
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
          isError
          onClose={clearError}
          title={'Failed!'}
        />
      )}
      {list}
    </>
  );
}
