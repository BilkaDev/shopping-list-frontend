import { useState } from 'react';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { Link } from 'react-router-dom';
import { Tr, Td } from '@chakra-ui/react';
import { InfoModal } from '../../../common/components/UiElements/modals/InfoModal';
import { LoadingSpinner } from '../../../common/components/UiElements/LoadingSpinner';
import { ModalChakra } from '../../../common/components/UiElements/modals/ModalChakra';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { EditItemForm } from '../../../common/components/FormElements/EditItemForm';
import { ListItemProps } from '../../lists.types';
import { useAppDispatch } from '../../../common/Redux/store';
import { deleteListFetch } from '../../../common/Redux/fetch-services/list';

export const ListItem = ({ id, name }: ListItemProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  async function deleteHandler(id: string) {
    dispatch(deleteListFetch(id, sendRequest));
  }

  return (
    <>
      <ModalChakra
        isOpen={showEditModal}
        title={`Change list name: "${name}"`}
        onClose={() => setShowEditModal(false)}
      >
        <EditItemForm element="list" itemId={id} initialInputs={{ name }} />
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
          <Link to={`/list/${id}/${name}`}>{name}</Link>
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
