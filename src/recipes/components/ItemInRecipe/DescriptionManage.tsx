import { FormEvent, useState } from 'react';
import { Button, Textarea, VStack } from '@chakra-ui/react';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { InfoModal } from '../../../common/components/UiElements/InfoModal';
import { LoadingSpinner } from '../../../common/components/UiElements/LoadingSpinner';
import { useDispatch } from 'react-redux';
import { editDescriptionRecipeAction } from '../../../common/Redux/actions/Recipe';

interface Props {
  show: boolean;
  id: string;
  onClose: any;
  description?: string;
}

export function DescriptionManage({ show, id, onClose, description }: Props) {
  const [descriptionInput, setDescriptionInput] = useState(description ?? '');
  const { isLoading, error, sendRequest, clearError, setError } =
    useHttpClient();
  const dispatch = useDispatch();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const res: any = await sendRequest(
      '/recipe/edit-description',
      'PATCH',
      { description: descriptionInput, id },
      {
        'Content-Type': 'application/json',
      }
    );
    if (!res.isSuccess) {
      return setError('Adding description to the recipe failed.');
    } else {
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
