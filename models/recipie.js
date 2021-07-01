import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  cuisineType: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  ingredient: [
    {
      type: String,
      required: true,
    },
  ],
});

export const Recipes = mongoose.model("Recipe", userSchema);
