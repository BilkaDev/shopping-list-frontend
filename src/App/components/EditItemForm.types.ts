export interface EditItemFormProps {
  element: string;
  itemId: string;
  recipeId?: string;
  initialInputs: {
    name: string;
    category?: number;
    weight?: number;
    count?: number;
  };
}


export interface EditItemFormInputs {
  name: string;
  category: number;
  weight: number;
  count: number;
}
