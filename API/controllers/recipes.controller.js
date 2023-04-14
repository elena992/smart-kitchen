const Recipe = require("../models/Recipe.model");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");

module.exports.create = (req, res, next) => {
  if (req.file) {
    req.body.photo = req.file.path;
  }

  const { name, instructions, ingredients, photo } = req.body;

  Recipe.create({
    name,
    instructions,
    ingredients,
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

