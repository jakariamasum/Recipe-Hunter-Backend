import express from 'express'
import { receipeContollers } from './recipe.controller';

const router= express.Router();

router.post('/',receipeContollers.createRecipe)


export const receipeRoutes= router;