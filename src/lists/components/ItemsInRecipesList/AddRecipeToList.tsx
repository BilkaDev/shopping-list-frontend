import { useState } from 'react';
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

export function AddRecipeToList() {
  const { recipes } = useSelector((store: RootState) => store.recipes);
  const [selectValue, setSelectValue] = useState(recipes[0]?.id);
  const [isSuccess, setIsSuccess] = useState(false);
  const { error, sendRequest, clearError } = useHttpClient({
    all: 'Adding recipe failed. Please try again later',
  });
  const dispatch = useDispatch();

  const { id: listId } = useParams();

  if (recipes.length === 0) {
    return <p> no recipes to select</p>;
  }

  async function addToListHandler() {
    const recipeData = await sendRequest<GetRecipeResponse>(
      `/recipe/user/${selectValue}`
    );
    if (recipeData) {
      const data = await sendRequest<AddRecipeToListResponse>(
        `/list/add-recipe/${listId}/${recipeData.recipe.id}`,
        'POST',
        null
      );
      if (data) {
        dispatch(addRecipeToList(recipeData.recipe));
        setIsSuccess(true);
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
      <Select value={selectValue} setValue={setSelectValue}>
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
        onClick={addToListHandler}
      >
        Add to list
      </Button>
    </HStack>
  );
}
