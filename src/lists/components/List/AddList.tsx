import { useState } from 'react';
import { ManageNameForm } from '../../../common/components/FormElements/ManageNameForm';
import {
  CreateListRequest,
  CreateListResponse,
  ListInterface,
} from 'interfaces';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { useDispatch } from 'react-redux';
import { addList } from '../../../common/Redux/actions/list';
import { Button, VStack } from '@chakra-ui/react';
import { InfoModal } from '../../../common/components/UiElements/InfoModal';
import { LoadingSpinner } from '../../../common/components/UiElements/LoadingSpinner';
import { SuccessfullyBox } from '../../../common/components/UiElements/SuccessfullyBox';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { AddListFormInterface } from '../../lists.types';

const AddListSchema = Yup.object().shape({
  name: Yup.string()
    .required('List name is required!')
    .min(2, 'List name is too short! minimum length is 2 characters!')
    .max(100, 'List is too long! Maximum length is 100 characters!'),
});

export const AddList = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddListFormInterface>({
    resolver: yupResolver(AddListSchema),
  });

  const { isLoading, error, sendRequest, clearError } = useHttpClient({
    400: 'Adding the list failed, check the recipe name (the name must not repeat)',
  });
  const dispatch = useDispatch();

  const addListToLists = async (values: AddListFormInterface) => {
    const newList: CreateListRequest = {
      listName: values.name,
    };
    const data = await sendRequest<CreateListResponse>(
      '/list',
      'POST',
      newList
    );
    if (data) {
      const newListWithId: ListInterface = {
        id: data.id,
        listName: newList.listName,
        items: [],
        recipes: [],
      };
      dispatch(addList(newListWithId));
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <SuccessfullyBox
        text="Adding the list was successful."
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
        <form onSubmit={handleSubmit(addListToLists)}>
          <VStack spacing={4} align="flex-start">
            <ManageNameForm register={register('name')} errors={errors} />
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
