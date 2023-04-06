const mongoose = require('mongoose');
const RecipeSchema = new mongoose.Schema({
    
  name: {
    type: String,
    required: [true],
  },
  description: {
    type: String,
    required: [true],
  },
  photo: {
    type: String,
    required: [true],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true],
  },
 
  },
);

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;