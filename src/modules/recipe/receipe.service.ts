import { Recipe } from "./recipe.interface";
import { RecipeModel } from "./recipe.model";

const createRecipeToDB = async (recipe: Recipe) => {
  const result = await RecipeModel.create(recipe);
  return result;
};


export const recipeServices={
    createRecipeToDB,
}