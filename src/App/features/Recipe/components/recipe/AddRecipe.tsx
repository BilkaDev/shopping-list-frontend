import { Button, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';

import { InfoModal, LoadingSpinner, SuccessfullyBox } from '@/App/shared/ui/Page';
import { useHttpClient } from '@/App/shared/utils/http-hook';
import { useAuthSelector } from '@/Redux/hooks/auth-hook';
import { InputForm } from '@/App/shared/ui/Input';
import { useAppDispatch } from '@/Redux/store';
import { addRecipeFetch } from '@/Redux/fetch-services/recipes';
import { AddRecipeRequest } from '@/types';

import { AddRecipeFormInputs } from '../../containers/recipes.types';

const AddRecipeSchema = Yup.object().shape({
  name: Yup.string()
    .required('Recipe name is required!')
    .min(2, 'Recipe name is too short! minimum length is 2 characters!')
    .max(100, 'Recipe is too long! Maximum length is 100 characters!'),
});

export const AddRecipe = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddRecipeFormInputs>({
    resolver: yupResolver(AddRecipeSchema),
  });

  const { isLoading, isSuccess, setIsSuccess, sendRequest, error, clearError } =
    useHttpClient({
      400: 'Adding the Recipe failed, check the Recipe name (the name must not repeat)',
    });
  const dispatch = useAppDispatch();
  const { userId } = useAuthSelector();

  const addRecipe = (values: AddRecipeFormInputs) => {
    const recipe: AddRecipeRequest = {
      name: values.name,
      userId,
      description: '',
      items: [],
    };
    dispatch(addRecipeFetch(recipe, sendRequest));
  };

  if (isSuccess) {
    return (
      <SuccessfullyBox
        text='Adding the recipe was successful.'
        setIsSuccess={setIsSuccess}
      />
    );
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
      {!isLoading && !error && (
        <form onSubmit={handleSubmit(addRecipe)}>
          <VStack  width={300} spacing={4} align='flex-start'>
            <InputForm
              register={register('name')}
              label='Name:'
              placeholder='Recipe name'
              errors={errors}
            />
            <Button
              type='submit'
              disabled={isLoading}
              colorScheme='gray'
              color='var(--dark)'
            >
              Add
            </Button>
          </VStack>
        </form>
      )}
    </>
  );
};
