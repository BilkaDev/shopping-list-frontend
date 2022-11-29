import { FormEvent, useState } from 'react';
import { ManageList } from './ManageList';
import {
  CreateListRequest,
  CreateListResponse,
  ListInterface,
} from 'interfaces';
import { useForm } from '../../../common/hooks/form-hook';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { useDispatch } from 'react-redux';
import { addList } from '../../../common/Redux/actions/list';
import { Button, VStack } from '@chakra-ui/react';
import { InfoModal } from '../../../common/components/UiElements/InfoModal';
import { LoadingSpinner } from '../../../common/components/UiElements/LoadingSpinner';
import { SuccessfullyBox } from '../../../common/components/UiElements/SuccessfullyBox';

export const AddList = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { formState, inputHandler } = useForm(
    {
      name: { isValid: false, value: '' },
    },
    false
  );
  const { isLoading, error, sendRequest, clearError } = useHttpClient({
    400: 'Adding the list failed, check the recipe name (the name must not repeat)',
  });
  const dispatch = useDispatch();

  const addListToLists = async (e: FormEvent) => {
    e.preventDefault();

    const newList: CreateListRequest = {
      listName: formState.inputs.name.value,
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
        <form onSubmit={addListToLists}>
          <VStack spacing={4} align="flex-start">
            <ManageList inputHandler={inputHandler} />
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
