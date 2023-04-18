const Recipe = require("../models/Recipe.model");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const axios = require("axios");

module.exports.create = (req, res, next) => {
  if (req.file) {
    req.body.photo = req.file.path;
  }

  const { name, ingredients, instructions, photo } = req.body;

  Recipe.create({
    name,
    ingredients,
    instructions,
    owner: req.currentUserId,
    photo,
  })
    .then((recipe) => res.status(201).json(recipe))
    .catch(next);
};

module.exports.list = (req, res, next) => {
  Recipe.find()
    .then((recipes) => res.json(recipes))
    .catch(next);
};

module.exports.getMyRecipes = (req, res, next) => {
  Recipe.find({ owner: req.currentUserId })
    .then(recipes => res.json(recipes))
    .catch(error => next(error));
};

module.exports.edit = (req, res, next) => {
  const { id } = req.params;

  Recipe.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedRecipe) => res.json(updatedRecipe))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  Recipe.findOneAndDelete({ _id: id, owner: req.currentUserId })
    .then((deletedRecipe) => {
      if (!deletedRecipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.status(204).end();
    })
    .catch(next);
};

module.exports.created = (req, res, next) => {
  const { id } = req.params;
  Recipe.findByIdAndUpdate(id, { owner: req.currentUserId }, { new: true })
    .then((recipe) => res.json(recipe))
    .catch(next);
};

module.exports.searchRecipes = (req, res, next) => {
  const { ingredients } = req.body;

  const prompt = `Give me some recipe ideas using the following ingredients: ${ingredients}.`;
  const data = {
    prompt: prompt,
    model: "text-davinci-003",
    max_tokens: 5,
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
