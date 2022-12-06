import { useState } from 'react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Td, Tr } from '@chakra-ui/react';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { InfoModal } from '../../../common/components/UiElements/InfoModal';
import { ModalChakra } from '../../../common/components/UiElements/ModalChakra';
import { EditItemForm } from '../../../common/components/FormElements/EditItemForm';
import { ItemInRecipeProps } from '../../recipes.types';
import { removeItemFromRecipeFetch } from '../../../common/Redux/fetch-services/recipes';
import { useAppDispatch } from '../../../common/Redux/store';

export const ItemInRecipe = ({
  category,
  item,
  recipeId,
}: ItemInRecipeProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useAppDispatch();
  const { error, sendRequest, clearError } = useHttpClient({
    all: 'Something went wrong when deleting the recipe. Please try again later.',
  });
  if (category !== item.product.category) {
    return null;
  }

  const deleteItemHandler = async () => {
    dispatch(removeItemFromRecipeFetch(item.id, recipeId, sendRequest));
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
