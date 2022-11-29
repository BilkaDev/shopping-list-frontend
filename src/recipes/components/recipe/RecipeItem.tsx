import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { InfoModal } from '../../../common/components/UiElements/InfoModal';
import { ModalChakra } from '../../../common/components/UiElements/ModalChakra';
import { Td, Tr } from '@chakra-ui/react';
import { LoadingSpinner } from '../../../common/components/UiElements/LoadingSpinner';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { deleteRecipeAction } from '../../../common/Redux/actions/Recipe';
import { EditItemForm } from '../../../common/components/UiElements/EditItemForm';
import { ApiResponse, DeleteRecipeResponse } from 'interfaces';

interface Props {
  id: string;
  name: string;
}

export const RecipeItem = ({ id, name }: Props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  async function deleteHandler(id: string) {
    const res: ApiResponse<DeleteRecipeResponse> = await sendRequest(
      `/recipe/${id}`,
      'DELETE'
    );
    if (res.status === 200) {
      dispatch(deleteRecipeAction(id));
    }
  }

  return (
    <>
      <ModalChakra
        isOpen={showEditModal}
        title={`Change recipe name: "${name}"`}
        onClose={() => setShowEditModal(false)}
      >
        <EditItemForm
          element="recipe"
          itemId={id}
          initialInputs={{ name }}
          initialValid={false}
        />
      </ModalChakra>
      {error && (
        <InfoModal
          message={error}
          isError
          onClose={clearError}
          title={'Failed!'}
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
