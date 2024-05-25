import { Schema, model, connect, Model } from "mongoose";
import { Recipe } from "./recipe.interface";

const RecipeSchema = new Schema<Recipe>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  details: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  creatorEmail: {
    type: String,
    required: true,
    trim: true,
  },
  purchased_by: {
    type: [String],
    required: true,
    trim: true,
    default: [],
  },
  watchCount: {
    type: Number,
    default: 0,
  },
});

export const RecipeModel = model<Recipe>("recipe", RecipeSchema);
