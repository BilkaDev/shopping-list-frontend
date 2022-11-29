import { FormEvent, useState } from 'react';
import { Button, Textarea, VStack } from '@chakra-ui/react';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { InfoModal } from '../../../common/components/UiElements/InfoModal';
import { LoadingSpinner } from '../../../common/components/UiElements/LoadingSpinner';
import { useDispatch } from 'react-redux';
import { editDescriptionRecipeAction } from '../../../common/Redux/actions/Recipe';
import { ApiResponse } from '../../../../../shopping-list-BE/src/interfaces/api';
import { EditDescriptionRecipeRequest } from 'interfaces';

interface Props {
  show: boolean;
  id: string;
  onClose: any;
  description?: string;
}

export function DescriptionManage({ show, id, onClose, description }: Props) {
  const [descriptionInput, setDescriptionInput] = useState(description ?? '');
  const { isLoading, error, sendRequest, clearError } = useHttpClient(
    { all: 'Adding description to the recipe failed.' }
  );
  const dispatch = useDispatch();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const res: ApiResponse<EditDescriptionRecipeRequest> = await sendRequest(
      '/recipe/edit-description',
      'PATCH',
      {
        description: descriptionInput,
        id,
      }
    );
    if (res.status === 200) {
      dispatch(
        editDescriptionRecipeAction({ description: descriptionInput, id })
      );
      onClose();
    }
  };

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
      {show && (
        <form onSubmit={submitHandler}>
          <VStack spacing={4}>
            <Textarea
              placeholder="Add description"
              onChange={e => setDescriptionInput(e.target.value)}
              value={descriptionInput}
            />
            <Button type="submit" colorScheme="gray" color="var(--dark)">
              {description ? 'Update' : 'Add description'}
            </Button>
          </VStack>
        </form>
      )}
    </>
  );
}
