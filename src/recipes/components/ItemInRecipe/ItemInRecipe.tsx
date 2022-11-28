import { useState } from 'react';
import {
  ApiResponse,
  DeleteItemInListResponse,
  ItemInListInterface,
} from 'interfaces';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Td, Tr } from '@chakra-ui/react';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { useDispatch } from 'react-redux';
import { InfoModal } from '../../../common/components/UiElements/InfoModal';
import { ModalChakra } from '../../../common/components/UiElements/ModalChakra';
import { EditItemForm } from '../../../common/components/UiElements/EditItemForm';
import { deleteItemInRecipeAction } from '../../../common/Redux/actions/Recipe';

interface Props {
  category: number;
  item: ItemInListInterface;
  recipeId: string;
}

export const ItemInRecipe = ({ category, item, recipeId }: Props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();
  const { error, sendRequest, clearError } = useHttpClient();
  if (category !== item.product.category) {
    return null;
  }

  const deleteItemHandler = async () => {
    const res: ApiResponse<DeleteItemInListResponse> = await sendRequest(
      `/list/item/${item.id}`,
      'DELETE'
    );
    if (res.status === 200) {
      dispatch(deleteItemInRecipeAction(item.id, recipeId));
    }
  };

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
      <ModalChakra
        isOpen={showEditModal}
        title={`Edit item "${item.product.name}"`}
        onClose={() => setShowEditModal(false)}
      >
        <EditItemForm
          element="itemInRecipe"
          itemId={item.id}
          recipeId={recipeId}
          initialInputs={{
            name: item.product.name,
            category: item.product.category,
            weight: item.weight,
            count: item.count,
          }}
          initialValid={false}
        />
      </ModalChakra>
      <Tr>
        <Td>{item.product.name}</Td>
        <Td>{item.count}</Td>
        <Td>{item.weight}</Td>
        <Td>
          <button onClick={() => setShowEditModal(true)}>
            <EditIcon />
          </button>
        </Td>
        <Td>
          <button onClick={deleteItemHandler}>
            <DeleteIcon />
          </button>
        </Td>
      </Tr>
    </>
  );
};
