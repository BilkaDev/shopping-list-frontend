import { FormEvent, useState } from 'react';
import { Button, Textarea, VStack } from '@chakra-ui/react';

import { useHttpClient } from '@/App/shared/utils/http-hook';
import { changeDescriptionRecipeFetch } from '@/Redux/fetch-services/recipes';
import { useAppDispatch } from '@/Redux/store';
import { InfoModal, LoadingSpinner } from '@/App/shared/ui/Page';

import { DescriptionManageProps } from '../../containers/recipes.types';

export function DescriptionManage({
                                    show,
                                    id,
                                    onClose,
                                    description,
                                  }: DescriptionManageProps) {
  const [descriptionInput, setDescriptionInput] = useState(description ?? '');
  const { isLoading, error, sendRequest, clearError } = useHttpClient({
    all: 'Adding description to the Recipe failed.',
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
              placeholder='Add description'
              onChange={e => setDescriptionInput(e.target.value)}
              value={descriptionInput}
            />
            <Button type='submit' colorScheme='gray' color='var(--dark)'>
              {description ? 'Update' : 'Add description'}
            </Button>
          </VStack>
        </form>
      )}
    </>
  );
}
