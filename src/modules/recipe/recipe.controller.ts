import { Request, Response } from "express";
import { recipeServices } from "./receipe.service";
import { userServices } from "../user/user.service";

const createRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = req.body;
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
  const { email } = req.body;
  console.log(email);
  const recipe = await recipeServices.getRecipeById(id);

  if (!recipe) {
    return res.status(404).json({
      message: "Recipe not found",
    });
  }

  const user = await userServices.getSingleUserByEmailFromDB(email);

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

  user.coin -= 10;
  recipe.purchased_by.push(email);
  recipe.watchCount += 1;

  await user.save();
  await recipe.save();
  res.status(200).json(recipe);
};
export const receipeContollers = {
  createRecipe,
  viewRecipe,
};
