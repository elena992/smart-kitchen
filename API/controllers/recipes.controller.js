const Recipe = require("../models/Recipe.model");
const axios = require("axios");
const uploadSingleImage = require("../config/storage.config");

module.exports.create = (req, res, next) => {
  if (req.file) {
    // manually saved
    req.body.photo = req.file.path;
  }
  // saved from open ai
  else {
    uploadSingleImage(req.body.photo);
  }

  const { name, servings, ingredients, instructions, photo, notes } = req.body;
  Recipe.create({
    name,
    servings,
    ingredients,
    instructions,
    photo,
    notes,
    owner: req.currentUserId,
  })
    .then((recipe) => res.status(201).json(recipe))
    .catch(next);
};

module.exports.list = (req, res, next) => {
  Recipe.find()
    .then((recipes) => res.json(recipes))
    .catch(next);
};

module.exports.getRecipesByCurrentUser = (req, res, next) => {
  const userId = req.currentUserId;

  Recipe.find({ owner: userId })
    .then((recipe) => res.json(recipe))
    .catch(next);
};

module.exports.getRecipeById = (req, res, next) => {
  const recipeId = req.params.id;

  Recipe.findById(recipeId)
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).send("Recipe not found");
      }

      res.json(recipe);
    })
    .catch(next);
};

module.exports.searchRecipes = (req, res, next) => {
  const { ingredients } = req.body;
  const prompt = `Give me some recipe ideas using the following ingredients: ${ingredients} in this {"name":"","servings":0,"ingredients":[""],"instructions":[""],"notes":""} json format.`;
  const data = {
    prompt: prompt,
    model: "text-davinci-003",
    max_tokens: 2000,
    temperature: 0,
  };

  axios
    .post("https://api.openai.com/v1/completions", data, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    })
    .then((response) => {
      const result = response.data.choices[0].text;
      res.json({ result });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getImageFromPrompt = (req, res, next) => {
  const { prompt } = req.body;
  const data = {
    prompt: prompt,
    n: 1,
    size: "512x512",
  };

  axios
    .post("https://api.openai.com/v1/images/generations", data, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      let image = response.data.data[0].url;
      res.json({ image });
    })
    .catch((error) => {
      next(error);
    });
};
