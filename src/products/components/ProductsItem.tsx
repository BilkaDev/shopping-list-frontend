import { useState } from 'react';
import { useHttpClient } from '../../common/hooks/http-hook';
import { ProductCategory } from 'interfaces';
import { useDispatch } from 'react-redux';
import { deleteProductAction } from '../../common/Redux/actions/product';
import { Td, Tr } from '@chakra-ui/react';
import { ModalChakra } from '../../common/components/UiElements/ModalChakra';
import { InfoModal } from '../../common/components/UiElements/InfoModal';
import { LoadingSpinner } from '../../common/components/UiElements/LoadingSpinner';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { EditItemForm } from '../../common/components/UiElements/EditItemForm';

interface Props {
  name: string;
  category: ProductCategory;
  id: string;
}

export const ProductsItem = (props: Props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const { name, id, category } = props;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const dispatch = useDispatch();

  async function deleteProduct(id: string) {
    const response = await sendRequest(`/product/${id}`, 'DELETE');
    if (response.isSuccess) {
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
