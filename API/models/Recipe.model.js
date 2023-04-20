const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { REQUIRED_FIELD } = require("../config/errorMessages");

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, REQUIRED_FIELD],
    },
    servings: {
      type: Number,
    },
    ingredients: {
      type: [],
      required: [true, REQUIRED_FIELD],
    },
    instructions: {
      type: [],
      required: [true, REQUIRED_FIELD],
    },
    photo: {
      type: String,
    },
    notes: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, REQUIRED_FIELD],
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
