import { InfoModal } from '../../common/components/UiElements/modals/InfoModal';
import { LoadingSpinner } from '../../common/components/UiElements/LoadingSpinner';
import { Section } from '../../common/components/UiElements/Section';
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
import { useHttpClient } from '../../common/hooks/http-hook';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AddItem } from '../../lists/components/ItemInList/AddItem';
import { useParams } from 'react-router-dom';
import { GetRecipeResponse, ProductCategory } from 'interfaces';
import { setItemInRecipesAction } from '../../common/Redux/actions/Recipe';
import { ItemsListRecipe } from '../components/ItemInRecipe/ItemsListRecipe';
import { RootState } from '../../common/Redux/store';
import { DescriptionManage } from '../components/ItemInRecipe/DescriptionManage';

export const ItemsInRecipe = () => {
  const { id, name } = useParams();
  const { recipes } = useSelector((store: RootState) => store.recipes);
  const recipe = recipes.filter(recipe => recipe.id === id)[0];
  const [showEditDescription, setShowEditDescription] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient({
    all: 'Something went wrong when loading recipes. Please try again later.',
  });
  const dispatch = useDispatch();
  const entries = Object.entries(ProductCategory);
  const category = [];
  useEffect(() => {
    (async () => {
      if (recipe?.items) return;
      const data = await sendRequest<GetRecipeResponse>(`/recipe/user/${id}`);
      if (!data) return;
      dispatch(setItemInRecipesAction(data.recipe));
    })();
  }, [dispatch, sendRequest, id, recipe?.items]);

  for (const key of entries) {
    if (typeof key[1] === 'number') {
      category.push(key[0]);
    }
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
      <Section>
        <Center>
          <Text fontSize="4xl">Add product to recipe</Text>
        </Center>
        <AddItem isRecipe />
        <Center paddingTop="1.5rem">
          <Text fontSize="4xl">Recipe {name}</Text>
        </Center>
        <Accordion allowToggle width="80%">
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="center">
                <Text fontSize="3xl">Description:</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <DescriptionManage
                show={!recipe?.description || showEditDescription}
                onClose={() => setShowEditDescription(false)}
                id={id as string}
                description={recipe.description}
              />
              {!!recipe?.description && !showEditDescription && (
                <VStack>
                  <Text w="100%" whiteSpace="pre-wrap">
                    {recipe.description}
                  </Text>
                  <Button
                    colorScheme="gray"
                    color="var(--dark)"
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
          <UnorderedList styleType="none" spacing={6}>
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
