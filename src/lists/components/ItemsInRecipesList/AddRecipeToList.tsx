import { Button, HStack, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../common/Redux/store';
import { Select } from '../../../common/components/UiElements/Select';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { useParams } from 'react-router-dom';
import { InfoModal } from '../../../common/components/UiElements/InfoModal';
import { SuccessfullyBox } from '../../../common/components/UiElements/SuccessfullyBox';
import { useForm } from 'react-hook-form';
import { addRecipeToListFetch } from '../../../common/Redux/fetch-services/list';

export function AddRecipeToList() {
  const { recipes } = useSelector((store: RootState) => store.recipes);
  const { register, handleSubmit } = useForm();
  const { isSuccess, setIsSuccess, sendRequest, error, clearError } =
    useHttpClient({
      all: 'Adding recipe failed. Please try again later',
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
          onClose={clearError}
          title={'Failed!'}
          isError
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
