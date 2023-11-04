import { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Td, Tr, Center } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '@/App/shared/utils/http-hook';
import { ModalChakra, InfoModal } from '@/App/shared/ui/Page';
import { EditItemForm } from '@/App/components/EditItemForm';
import { useAppDispatch } from '@/Redux/store';
import {
  addToBasketFetch,
  removeFromBasketFetch,
  removeItemFromListFetch,
} from '@/Redux/fetch-services/list';

import { ItemInListProps } from '../../containers/lists.types';

export const ItemInList = ({ category, item, isRecipe }: ItemInListProps) => {
  const [inBasket, setInBasket] = useState(item.itemInBasket);
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useAppDispatch();
  const { sendRequest, error, clearError } = useHttpClient({
    all: 'Something went wrong when deleting the item. Please try again later.',
  });
  const { id: listId } = useParams();
  useEffect(() => {
    setInBasket(item.itemInBasket);
  }, [item]);

  if (category !== item.product.category) {
    return null;
  }

  const addToBasket = async () => {
    setInBasket(true);
    dispatch(addToBasketFetch(item.id, listId, sendRequest));
  };

  const removeFromBasket = async () => {
    setInBasket(false);
    dispatch(removeFromBasketFetch(item.id, listId, sendRequest));
  };

  const deleteItemHandler = async () => {
    dispatch(removeItemFromListFetch(item.id, sendRequest));
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
          element='itemInList'
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
          cursor='pointer'
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
