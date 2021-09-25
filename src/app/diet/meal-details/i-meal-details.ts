import {IRecipeSteps} from "./irecipe-steps";

export interface IMealDetails {
  id: string,
  name: string,
  urlImage: string,
  mealDifficulty: string,
  calories: number,
  type: string,
  protein: string,
  carbohydrates: string,
  fat: string,
  fiber: string,
  ingredients: Map<string, any>,
  recipeSteps: IRecipeSteps[]
}
