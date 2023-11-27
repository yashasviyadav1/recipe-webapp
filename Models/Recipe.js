// models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  image: String,
//   steps: String,  // You may want to change this to an array if each step is a separate item
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
