import { FormEvent, useState } from 'react';
import { Button, Textarea, VStack } from '@chakra-ui/react';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { InfoModal } from '../../../common/components/UiElements/modals/InfoModal';
import { LoadingSpinner } from '../../../common/components/UiElements/LoadingSpinner';
import { changeDescriptionRecipeFetch } from '../../../common/Redux/fetch-services/recipes';
import { useAppDispatch } from '../../../common/Redux/store';
import {DescriptionManageProps} from "../../recipes.types";

export function DescriptionManage({
  show,
  id,
  onClose,
  description,
}: DescriptionManageProps) {
  const [descriptionInput, setDescriptionInput] = useState(description ?? '');
  const { isLoading, error, sendRequest, clearError } = useHttpClient({
    all: 'Adding description to the recipe failed.',
  });
  const dispatch = useAppDispatch();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(changeDescriptionRecipeFetch(id, descriptionInput, sendRequest));
    onClose();
  };

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
