import express from "express";
import { receipeContollers } from "./recipe.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = express.Router();

router.post("/", receipeContollers.createRecipe);
router.get("/", receipeContollers.getAllRecipes);
router.post("/add", authenticate, receipeContollers.createRecipe);
router.get("/:id", authenticate, receipeContollers.viewRecipe);
router.get("/recipe/:id", authenticate, receipeContollers.getRecipeById);

export const receipeRoutes = router;
