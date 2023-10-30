import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Td, Tr } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { LoadingSpinner, ModalChakra, InfoModal } from '@/shared/ui/Page';
import { useHttpClient } from '@/common/hooks/http-hook';
import { EditItemForm } from '@/common/components/FormElements/EditItemForm';
import { removeRecipeFetch } from '@/common/Redux/fetch-services/recipes';
import { useAppDispatch } from '@/common/Redux/store';

import { RecipeItemProps } from '../../recipes.types';

export const RecipeItem = ({ id, name }: RecipeItemProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, error, sendRequest, clearError } = useHttpClient({
    all: 'Something went wrong when deleting the Recipe.',
  });

  function deleteHandler(id: string) {
    dispatch(removeRecipeFetch(id, sendRequest));
  }

  return (
    <>
      <ModalChakra
        isOpen={showEditModal}
        title={`Change recipe name: "${name}"`}
        onClose={() => setShowEditModal(false)}
      >
        <EditItemForm element='recipe' itemId={id} initialInputs={{ name }} />
      </ModalChakra>
      {error && (
        <InfoModal
          message={error}
          onClose={clearError}
          title={'Failed!'}
          isError
        />
      )}
      {isLoading && <LoadingSpinner />}
      <Tr>
        <Td>
          <Link to={`/recipe/${id}/${name}`}>{name}</Link>
        </Td>
        <Td>
          <button onClick={() => setShowEditModal(true)}>
            <EditIcon />
          </button>
        </Td>
        <Td>
          <button onClick={() => deleteHandler(id)}>
            <DeleteIcon />
          </button>
        </Td>
      </Tr>
    </>
  );
};
