import { Recipe } from "./recipe.interface";
import { RecipeModel } from "./recipe.model";

const createRecipeToDB = async (recipe: Recipe) => {
  const result = await RecipeModel.create(recipe);
  return result;
};

const getRecipeById = async (id: string) => {
  const result = await RecipeModel.findOne({ _id: id });
  return result;
};

export const recipeServices = {
  createRecipeToDB,
  getRecipeById,
};
