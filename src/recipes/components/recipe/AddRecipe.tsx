import { InfoModal } from '../../../common/components/UiElements/InfoModal';
import { useForm } from '../../../common/hooks/form-hook';
import { LoadingSpinner } from '../../../common/components/UiElements/LoadingSpinner';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { Button, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { FormEvent, useState } from 'react';
import { SuccessfullyBox } from '../../../common/components/UiElements/SuccessfullyBox';
import { ManageRecipeList } from './ManageRecipeList';
import { AddRecipeRequest, CreateRecipeResponse } from 'interfaces';
import { addRecipeAction } from '../../../common/Redux/actions/Recipe';
import { useAuth } from '../../../common/hooks/auth-hook';

export const AddRecipe = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { formState, inputHandler } = useForm(
    {
      name: { isValid: false, value: '' },
    },
    false
  );
  const { isLoading, error, sendRequest, clearError, setError } =
    useHttpClient();
  const dispatch = useDispatch();
  const { userId } = useAuth();

  const addRecipe = async (e: FormEvent) => {
    e.preventDefault();

    const newRecipe: AddRecipeRequest = {
      name: formState.inputs.name.value,
      userId,
      description: '',
      items: [],
    };
    const res: CreateRecipeResponse = await sendRequest(
      '/recipe',
      'POST',
      newRecipe
    );
    if (!res.isSuccess) {
      return setError(
        'Adding the recipe failed, check the recipe name (the name must not repeat)'
      );
    }
    dispatch(
      addRecipeAction({
        id: res.id,
        name: newRecipe.name,
        description: '',
        items: [],
      })
    );
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <SuccessfullyBox
        text="Adding the recipe was successful."
        setIsSuccess={setIsSuccess}
      />
    );
  }

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
      {isLoading && <LoadingSpinner />}
      {!isLoading && !error && (
        <form onSubmit={addRecipe}>
          <VStack spacing={4} align="flex-start">
            <ManageRecipeList inputHandler={inputHandler} />
            <Button
              type="submit"
              disabled={!formState.isValid}
              colorScheme="gray"
              color="var(--dark)"
            >
              Add
            </Button>
          </VStack>
        </form>
      )}
    </>
  );
};
