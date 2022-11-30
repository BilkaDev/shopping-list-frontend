import { useEffect, useState } from 'react';
import { DeleteItemInListResponse } from 'interfaces';
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Td, Tr, Center } from '@chakra-ui/react';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { useDispatch } from 'react-redux';
import {
  addItemToBasket,
  removeItemFromBasket,
  removeItemFromList,
} from '../../../common/Redux/actions/list';
import { InfoModal } from '../../../common/components/UiElements/InfoModal';
import { ModalChakra } from '../../../common/components/UiElements/ModalChakra';
import { EditItemForm } from '../../../common/components/FormElements/EditItemForm';
import { ItemInListProps } from 'src/lists/lists.types';

export const ItemInList = ({ category, item, isRecipe }: ItemInListProps) => {
  const [inBasket, setInBasket] = useState(item.itemInBasket);
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();
  const { error, sendRequest, clearError } = useHttpClient({
    all: 'Something went wrong when deleting the item. Please try again later.',
  });
  useEffect(() => {
    setInBasket(item.itemInBasket);
  }, [item]);

  if (category !== item.product.category) {
    return null;
  }

  const addToBasket = async () => {
    setInBasket(true);
    dispatch(addItemToBasket(item.id));
    await sendRequest(`/list/item/ad-to-basket/${item.id}`, 'PATCH');
  };

  const removeFromBasket = async () => {
    setInBasket(false);
    dispatch(removeItemFromBasket(item.id));
    await sendRequest(`/list/item/remove-from-basket/${item.id}`, 'PATCH');
  };

  const deleteItemHandler = async () => {
    const data = await sendRequest<DeleteItemInListResponse>(
      `/list/item/${item.id}`,
      'DELETE'
    );
    if (data) {
      dispatch(removeItemFromList(item.id));
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
          element="itemInList"
          itemId={item.id}
          initialInputs={{
            name: item.product.name,
            category: item.product.category,
            weight: item.weight,
            count: item.count,
          }}
        />
      </ModalChakra>
      <Tr>
        <Td
          textDecorationLine={!inBasket ? 'none' : 'line-through'}
          cursor="pointer"
          onClick={!inBasket ? addToBasket : removeFromBasket}
        >
          &nbsp;{item.product.name}&nbsp;
        </Td>
        <Td
          style={{
            textDecoration: 'line-through',
            textDecorationThickness: '2px',
            textDecorationColor: 'blue',
            textDecorationWidth: '200px',
          }}
        >
          <Center>
            <button>
              {inBasket ? (
                <CheckIcon onClick={removeFromBasket} />
              ) : (
                <CloseIcon onClick={addToBasket} />
              )}
            </button>
          </Center>{' '}
        </Td>
        <Td>{item.count}</Td>
        <Td>{item.weight}</Td>
        {!isRecipe && (
          <>
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
          </>
        )}
      </Tr>
    </>
  );
};
