import { useState } from 'react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Td, Tr } from '@chakra-ui/react';

import { useHttpClient } from '@/App/shared/utils/http-hook';
import { InfoModal, ModalChakra } from '@/App/shared/ui/Page';
import { EditItemForm } from '@/App/components/EditItemForm';
import { removeItemFromRecipeFetch } from '@/Redux/fetch-services/recipes';
import { useAppDispatch } from '@/Redux/store';

import { ItemInRecipeProps } from '../../containers/recipes.types';

export const ItemInRecipe = ({
                               category,
                               item,
                               recipeId,
                             }: ItemInRecipeProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useAppDispatch();
  const { error, sendRequest, clearError } = useHttpClient({
    all: 'Something went wrong when deleting the Recipe. Please try again later.',
  });
  if (category !== item.product.category) {
    return null;
  }

  const deleteItemHandler = async () => {
    dispatch(removeItemFromRecipeFetch(recipeId, item.id, sendRequest));
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
          element='itemInRecipe'
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
