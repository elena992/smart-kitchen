const mongoose = require('mongoose');
const RecipeSchema = new mongoose.Schema({
    
  name: {
    type: String,
    required: [true, REQUIRED_FIELD],
  },
  description: {
    type: String,
    required: [true, REQUIRED_FIELD],
  },
   ingredients: {
    type: String,
    required: [true, REQUIRED_FIELD],
  },
  photo: {
    type: String,
    required: [true, REQUIRED_FIELD],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true],
  },
},
{
    timestamps: true,
}
);

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;