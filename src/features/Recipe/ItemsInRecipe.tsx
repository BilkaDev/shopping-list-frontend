import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';

import { InfoModal, LoadingSpinner, Section } from '@/shared/ui/Page';
import { useHttpClient } from '@/common/hooks/http-hook';
import { AddItem } from '@/features/ShoppingList/components/ItemInList/AddItem';
import { ProductCategory } from '@/types';
import { RootState, useAppDispatch } from '@/common/Redux/store';
import { loadItemsInRecipeFetch } from '@/common/Redux/fetch-services/recipes';

import { ItemsListRecipe } from './components/ItemInRecipe/ItemsListRecipe';
import { DescriptionManage } from './components/ItemInRecipe/DescriptionManage';

export const ItemsInRecipe = () => {
  const { id, name } = useParams();
  const { recipes } = useSelector((store: RootState) => store.recipes);
  const recipe = recipes.filter(recipe => recipe.id === id)[0];
  const [showEditDescription, setShowEditDescription] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient({
    all: 'Something went wrong when loading Recipe. Please try again later.',
  });
  const dispatch = useAppDispatch();
  const entries = Object.entries(ProductCategory);
  const category = [];
  useEffect(() => {
    if (recipe?.items || !id) return;
    dispatch(loadItemsInRecipeFetch(id, sendRequest));
  }, [dispatch, id, recipe?.items, sendRequest]);

  for (const key of entries) {
    if (typeof key[1] === 'number') {
      category.push(key[0]);
    }
  }
  if (!recipe) return null;

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
      <Section>
        <Center>
          <Text fontSize='4xl'>Add product to recipe</Text>
        </Center>
        <AddItem isRecipe />
        <Center paddingTop='1.5rem'>
          <Text fontSize='4xl'>Recipe {name}</Text>
        </Center>
        <Accordion allowToggle width='80%'>
          <AccordionItem>
            <AccordionButton>
              <Box flex='1' textAlign='center'>
                <Text fontSize='3xl'>Description:</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <DescriptionManage
                show={!recipe.description || showEditDescription}
                onClose={() => setShowEditDescription(false)}
                id={id as string}
                description={recipe.description}
              />
              {!!recipe?.description && !showEditDescription && (
                <VStack>
                  <Text w='100%' whiteSpace='pre-wrap'>
                    {recipe.description}
                  </Text>
                  <Button
                    colorScheme='gray'
                    color='var(--dark)'
                    onClick={() => setShowEditDescription(true)}
                  >
                    Edit description
                  </Button>
                </VStack>
              )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <div>
          <UnorderedList styleType='none' spacing={6}>
            {category.map((category, id) => (
              <ItemsListRecipe
                key={id}
                categoryId={id}
                recipe={recipe}
                categoryName={category}
              />
            ))}
          </UnorderedList>
        </div>
      </Section>
    </>
  );
};
