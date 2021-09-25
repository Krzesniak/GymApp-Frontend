import {IRecipeSteps} from "./irecipe-steps";
import {IMealNutrients} from "./i-meal-nutrients";

export interface IMealDetails {
  id: string,
  name: string,
  urlImage: string,
  mealDifficulty: string,
  type: string,
  mealNutrient: IMealNutrients,
  ingredients: Map<string, any>,
  recipeSteps: IRecipeSteps[]
}
