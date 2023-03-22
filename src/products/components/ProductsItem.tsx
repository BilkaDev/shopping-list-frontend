import { useState } from 'react';
import { useHttpClient } from '../../common/hooks/http-hook';
import { Td, Tr } from '@chakra-ui/react';
import { ModalChakra } from '../../common/components/UiElements/modals/ModalChakra';
import { InfoModal } from '../../common/components/UiElements/modals/InfoModal';
import { LoadingSpinner } from '../../common/components/UiElements/LoadingSpinner';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { EditItemForm } from '../../common/components/FormElements/EditItemForm';
import { ProductsItemsProps } from '../products.types';
import { useAppDispatch } from '../../common/Redux/store';
import { deleteProductFetch } from '../../common/Redux/fetch-services/products';
import {ProductCategory} from "../../types";

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
          element="product"
          itemId={id}
          initialInputs={{
            name,
            category,
          }}
        />
      </ModalChakra>
      <Tr>
        <Td width={{ base: '200px' }}>{name}</Td>
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
