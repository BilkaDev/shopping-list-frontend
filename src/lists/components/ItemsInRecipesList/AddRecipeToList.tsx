import { Button, HStack, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../common/Redux/store';
import { Select } from '../../../common/components/UiElements/Select';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { useParams } from 'react-router-dom';
import { InfoModal } from '../../../common/components/UiElements/InfoModal';
import { SuccessfullyBox } from '../../../common/components/UiElements/SuccessfullyBox';
import { addRecipeToList } from '../../../common/Redux/actions/list';
import { AddRecipeToListResponse, GetRecipeResponse } from 'interfaces';
import { useForm } from 'react-hook-form';

export function AddRecipeToList() {
  const { recipes } = useSelector((store: RootState) => store.recipes);
  const { register, handleSubmit } = useForm();
  const { isSuccess, setIsSuccess, sendRequest, error, clearError } =
    useHttpClient({
      all: 'Adding recipe failed. Please try again later',
    });
  const dispatch = useDispatch();

  const { id: listId } = useParams();

  if (recipes.length === 0) {
    return <p> no recipes to select</p>;
  }

  async function addToListHandler(recipeId: string) {
    const recipeData = await sendRequest<GetRecipeResponse>(
      `/recipe/user/${recipeId}`
    );
    if (recipeData) {
      const data = await sendRequest<AddRecipeToListResponse>(
        `/list/add-recipe/${listId}/${recipeData.recipe.id}`,
        'POST'
      );
      if (data) {
        dispatch(addRecipeToList(recipeData.recipe));
      }
    }
  }

  if (isSuccess) {
    return (
      <SuccessfullyBox
        text="Adding the recipes was successful."
        setIsSuccess={setIsSuccess}
      />
    );
  }

  return (
    <HStack spacing={6}>
      {error && (
        <InfoModal
          message={error}
          isError
          onClose={clearError}
          title={'Failed!'}
        />
      )}
      <Text>Add recipes to list:</Text>
      <Select register={register('id')}>
        {recipes.map(recipe => (
          <option key={recipe.id} value={recipe.id}>
            {recipe.name}
          </option>
        ))}
      </Select>
      <Button
        type="submit"
        colorScheme="gray"
        padding="1rem 2rem"
        color="var(--dark)"
        onClick={handleSubmit(data => addToListHandler(data.id))}
      >
        Add to list
      </Button>
    </HStack>
  );
}
