import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tr, Td } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { useHttpClient } from '@/App/shared/utils/http-hook';
import { InfoModal, LoadingSpinner, ModalChakra } from '@/App/shared/ui/Page';
import { EditItemForm } from '@/App/components/EditItemForm';
import { useAppDispatch } from '@/Redux/store';
import { deleteListFetch } from '@/Redux/fetch-services/list';

import { ListItemProps } from '../../containers/lists.types';

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
        <EditItemForm element='list' itemId={id} initialInputs={{ name }} />
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
        <Td padding="5px">
          <Link to={`/list/${id}/${name}`}>{name}</Link>
        </Td>
        <Td
          textAlign='center'
          padding='5px'
          width='65px'>
          <button style={{ marginRight: '5px' }} onClick={() => setShowEditModal(true)}>
            <EditIcon />
          </button>
          <button onClick={() => deleteHandler(id)}>
            <DeleteIcon />
          </button>
        </Td>
      </Tr>
    </>
  );
};
