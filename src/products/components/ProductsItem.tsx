import { useState } from 'react';
import { useHttpClient } from '../../common/hooks/http-hook';
import { DeleteProductResponse, ProductCategory } from 'interfaces';
import { useDispatch } from 'react-redux';
import { deleteProductAction } from '../../common/Redux/actions/product';
import { Td, Tr } from '@chakra-ui/react';
import { ModalChakra } from '../../common/components/UiElements/ModalChakra';
import { InfoModal } from '../../common/components/UiElements/InfoModal';
import { LoadingSpinner } from '../../common/components/UiElements/LoadingSpinner';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { EditItemForm } from '../../common/components/UiElements/EditItemForm';
import { ProductsItemsProps } from '../products.types';

export const ProductsItem = ({ category, id, name }: ProductsItemsProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient({
    all: 'Something went wrong when deleting the Product. Please try again later.',
  });
  const dispatch = useDispatch();

  async function deleteProduct(id: string) {
    const data = await sendRequest<DeleteProductResponse>(
      `/product/${id}`,
      'DELETE'
    );
    if (data) {
      dispatch(deleteProductAction(id));
    }
  }

  function editProduct() {
    setShowEditModal(true);
  }

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
          initialValid={false}
        />
      </ModalChakra>
      <Tr>
        <Td>{name}</Td>
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
