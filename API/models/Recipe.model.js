const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { REQUIRED_FIELD } = require('../config/errorMessages');

const RecipeSchema = new mongoose.Schema({
    
  name: {
    type: String,
    required: [true, REQUIRED_FIELD],
  },
  ingredients: {
    type: String,
    required: [true, REQUIRED_FIELD],
  },
  instructions: {
    type: String,
    required: [true, REQUIRED_FIELD],
  },
   photo: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, REQUIRED_FIELD],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
},
{
    timestamps: true,
}
);

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;