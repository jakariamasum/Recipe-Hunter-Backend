import { Request, Response } from "express";
import { recipeServices } from "./receipe.service";

const createRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = req.body;
    const result = await recipeServices.createRecipeToDB(recipe);
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


export const receipeContollers={
    createRecipe,
}