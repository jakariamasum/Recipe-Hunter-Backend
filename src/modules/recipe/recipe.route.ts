import express from "express";
import { receipeContollers } from "./recipe.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = express.Router();

router.post("/", receipeContollers.createRecipe);
router.post("/add", authenticate, receipeContollers.createRecipe);
router.get("/:id", authenticate, receipeContollers.viewRecipe);

export const receipeRoutes = router;
