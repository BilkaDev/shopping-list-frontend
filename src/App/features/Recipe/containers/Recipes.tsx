import { Section } from '@/App/shared/ui/Page';

import { RecipeList } from '../components/recipe/RecipeList';
import { AddRecipe } from '../components/recipe/AddRecipe';

export const Recipes = () => {
  return (
    <Section>
      <h2>Add Recipes</h2>
      <AddRecipe />
      <h2>Your recipe lists!</h2>
      <RecipeList />
    </Section>
  );
};
