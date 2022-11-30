import { InfoModal } from '../../../common/components/UiElements/InfoModal';
import { LoadingSpinner } from '../../../common/components/UiElements/LoadingSpinner';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { Button, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { SuccessfullyBox } from '../../../common/components/UiElements/SuccessfullyBox';
import { AddRecipeRequest, CreateRecipeResponse } from 'interfaces';
import { addRecipeAction } from '../../../common/Redux/actions/Recipe';
import { useAuth } from '../../../common/hooks/auth-hook';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { InputForm } from '../../../common/components/UiElements/InputForm';

const AddRecipeSchema = Yup.object().shape({
  name: Yup.string()
    .required('Recipe name is required!')
    .min(2, 'Recipe name is too short! minimum length is 2 characters!')
    .max(100, 'Recipe is too long! Maximum length is 100 characters!'),
});

interface AddRecipeInterface {
  name: string;
}

export const AddRecipe = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddRecipeInterface>({
    resolver: yupResolver(AddRecipeSchema),
  });

  const { isLoading, error, sendRequest, clearError } = useHttpClient({
    400: 'Adding the recipe failed, check the recipe name (the name must not repeat)',
  });
  const dispatch = useDispatch();
  const { userId } = useAuth();

  const addRecipe = async (values: AddRecipeInterface) => {
    const newRecipe: AddRecipeRequest = {
      name: values.name,
      userId,
      description: '',
      items: [],
    };
    const data = await sendRequest<CreateRecipeResponse>(
      '/recipe',
      'POST',
      newRecipe
    );
    if (data) {
      dispatch(
        addRecipeAction({
          id: data.id,
          name: newRecipe.name,
          description: '',
          items: [],
        })
      );
      setIsSuccess(true);
    }
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
        <form onSubmit={handleSubmit(addRecipe)}>
          <VStack spacing={4} align="flex-start">
            <InputForm
              register={register('name')}
              label="Name:"
              placeholder="Recipe name"
              errors={errors}
            />
            <Button
              type="submit"
              disabled={!isValid}
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
