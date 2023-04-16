const Recipe = require("../models/Recipe.model");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const axios = require('axios');

module.exports.create = (req, res, next) => {
  if (req.file) {
    req.body.photo = req.file.path;
  }
  console.log("********* ", req.body);
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

module.exports.created = (req, res, next) => {
  const { id } = req.params;
  console.log("id", id);
  Recipe.findByIdAndUpdate(id, { createdBy: req.currentUserId }, { new: true })
    .then((recipe) => res.json(recipe))
    .catch(next);
};

module.exports.searchRecipes = (req, res, next) => {
  const prompt = `Give me some recipe ideas using the following ingredients: ${req.body.ingredients}.`;
  const data = {
    prompt: prompt,
    model: `text-davinci-003`,
    max_tokens: 60,
    n: 1,
    stop: "\n",
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  axios.post("https://api.openai/v1/completions", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    })
    .then((response) => {
      const result = response.data.choices[0].text.trim();
      res.json({ recipes: result });
    })
    .catch((error) => {
      next(error)
    });
};
