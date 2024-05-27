import { Recipe } from "./recipe.interface";
import { RecipeModel } from "./recipe.model";

const createRecipeToDB = async (recipe: Recipe) => {
  const result = await RecipeModel.create(recipe);
  return result;
};

const getRecipeByIdFromDB = async (id: string) => {
  const result = await RecipeModel.findOne({ _id: id });
  return result;
};

const getAllRecipesFromDB = async () => {
  const result = await RecipeModel.find();
  return result;
};

export const recipeServices = {
  createRecipeToDB,
  getRecipeByIdFromDB,
  getAllRecipesFromDB,
};
