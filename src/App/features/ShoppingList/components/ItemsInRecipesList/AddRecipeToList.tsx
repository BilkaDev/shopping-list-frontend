import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, HStack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { RootState, useAppDispatch } from '@/Redux/store';
import { Select } from '@/App/shared/ui/Select';
import { useHttpClient } from '@/App/shared/utils/http-hook';
import { InfoModal } from '@/App/shared/ui/Page/Modal/InfoModal';
import { SuccessfullyBox } from '@/App/shared/ui/Page/SuccessfullyBox';
import { addRecipeToListFetch } from '@/Redux/fetch-services/list';

interface AddRecipeToListProps {
  recipesIdInList: string[];
}

export function AddRecipeToList({ recipesIdInList }: AddRecipeToListProps) {
  const { recipes } = useSelector((store: RootState) => store.recipes);
  const { register, handleSubmit } = useForm();
  const { isSuccess, setIsSuccess, sendRequest, error, clearError } =
    useHttpClient({
      all: 'Adding Recipe failed. Please try again later',
    });
  const dispatch = useAppDispatch();

  const { id: listId } = useParams();

  if (recipes.length === 0) {
    return <p> no recipes to select</p>;
  }

  async function addToListHandler(recipeId: string) {
    if (!listId) return;
    dispatch(addRecipeToListFetch(listId, recipeId, sendRequest));
  }

  if (isSuccess) {
    return (
      <SuccessfullyBox
        text='Adding the recipes was successful.'
        setIsSuccess={setIsSuccess}
      />
    );
  }

  const isAvailableRecipes = recipes.filter(recipe => !recipesIdInList.includes(recipe.id)).length !== 0;

  return (
    <HStack spacing={6}>
      {error && (
        <InfoModal
          message={error}
          onClose={clearError}
          title={'Failed!'}
          isError
        />
      )}
      {!isAvailableRecipes ?
        <Text>No available recipes</Text> :
        <Text>Add recipes to list:</Text>
      }
      {isAvailableRecipes ? <><Select register={register('id')}>
        {recipes.filter(recipe => !recipesIdInList.includes(recipe.id)).map(recipe => (
          <option key={recipe.id} value={recipe.id}>
            {recipe.name}
          </option>
        ))}
      </Select>
        <Button
          type='submit'
          colorScheme='gray'
          padding='1rem 2rem'
          color='var(--dark)'
          onClick={handleSubmit(data => addToListHandler(data.id))}
        >
          Add to list
        </Button></> : null}
    </HStack>
  );
}
