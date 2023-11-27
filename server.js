// server.js
const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('./Models/Recipe.js');  // Import the Recipe model

const app = express();
const PORT = process.env.PORT || 3001;
const myConnectionString = 'mongodb+srv://yashasvic2407:34qSj1232f@cluster0.8lybbco.mongodb.net/?retryWrites=true&w=majority'


mongoose.connect(myConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });


// Define routes
app.use(express.json());

// Create a new recipe
app.post('/api/recipes', async (req, res) => {
  try {
    const { title, image, steps } = req.body;
    const newRecipe = new Recipe({ title, image, steps });
    const savedRecipe = await newRecipe.save();
    res.json(savedRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
