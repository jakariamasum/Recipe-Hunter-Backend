import { Request, Response } from "express";
import { recipeServices } from "./receipe.service";
import { userServices } from "../user/user.service";
import { UserModel } from "../user/user.model";

const createRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = req.body;
    console.log(recipe);
    const finalRecipeData = {
      ...recipe,
      watchCount: 0,
      purchased_by: [],
    };
    const result = await recipeServices.createRecipeToDB(finalRecipeData);
    res.status(200).json({
      success: true,
      message: "Recipe created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: "Recipe created successfully!",
      data: error,
    });
  }
};

const viewRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const email = req.query.email;
  console.log(email);
  const recipe = await recipeServices.getRecipeByIdFromDB(id);

  if (!recipe) {
    return res.status(404).json({
      message: "Recipe not found",
    });
  }

  const user = await userServices.getSingleUserByEmailFromDB(email as string);

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (recipe.creatorEmail === email) {
    return res.status(200).json(recipe);
  }

  if (user.coin < 10) {
    return res.status(400).json({ message: "Not enough coins" });
  }

  if (recipe.purchased_by.includes(email as string)) {
    return res.status(400).json({ message: "Recipe already purchased" });
  }
  user.coin -= 10;
  recipe.purchased_by.push(email as string);
  recipe.watchCount += 1;
  const creator = await UserModel.findOne({ email: recipe.creatorEmail });
  console.log(recipe);
  if (creator) {
    console.log(creator);
    creator.coin += 1;
    console.log(creator);
    await creator.save();
  }

  await user.save();
  await recipe.save();
  res.status(200).json(recipe);
};

const getAllRecipes = async (req: Request, res: Response) => {
  const { category, country, name } = req.query;
  console.log(category, country);
  const result = await recipeServices.getAllRecipesFromDB();
  let filteredRecipes = result;
  try {
    if (category) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.category === category
      );
    }

    if (country) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.country === country
      );
    }
    if (name) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.name === name
      );
    }
    if (country && category) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.country === country && recipe.category === category
      );
    }
    res.status(200).json({
      success: true,
      message: "Get recipes successfully!",
      data: filteredRecipes,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const getRecipeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await recipeServices.getRecipeByIdFromDB(id);
  try {
    res.status(200).json({
      success: true,
      message: "Get recipes successfully!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

export const receipeContollers = {
  createRecipe,
  viewRecipe,
  getAllRecipes,
  getRecipeById,
};
