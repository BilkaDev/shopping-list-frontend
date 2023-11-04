import { useState } from 'react';
import { Td, Tr } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { useHttpClient } from '@/App/shared/utils/http-hook';
import { EditItemForm } from '@/App/components/EditItemForm';
import { useAppDispatch } from '@/Redux/store';
import { deleteProductFetch } from '@/Redux/fetch-services/products';
import { ProductCategory } from '@/types';
import { InfoModal, LoadingSpinner, ModalChakra } from '@/App/shared/ui/Page';

import { ProductsItemsProps } from '../containers/products.types';

export const ProductsItem = ({ category, id, name }: ProductsItemsProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const { isLoading, sendRequest, error, clearError } = useHttpClient({
    all: 'Something went wrong when deleting the Product. Please try again later.',
  });
  const dispatch = useAppDispatch();

  async function deleteProduct(id: string) {
    dispatch(deleteProductFetch(id, sendRequest));
  }

  function editProduct() {
    setShowEditModal(true);
  }

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
      <ModalChakra
        isOpen={showEditModal}
        title={`Edit product "${name}"`}
        onClose={() => setShowEditModal(false)}
      >
        <EditItemForm
          element='product'
          itemId={id}
          initialInputs={{
            name,
            category,
          }}
        />
      </ModalChakra>
      <Tr>
        <Td width={{ base: '100px' }}>{name}</Td>
        <Td>{ProductCategory[category]}</Td>
        <Td>
          <button onClick={() => editProduct()}>
            <EditIcon />
          </button>
        </Td>
        <Td>
          <button onClick={() => deleteProduct(id)}>
            <DeleteIcon />
          </button>
        </Td>
      </Tr>
    </>
  );
};
