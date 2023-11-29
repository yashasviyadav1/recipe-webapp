// server.js

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB (replace 'your_database_uri' with your MongoDB URI)
const myConnectionString = 'mongodb+srv://yashasvic2407:12345678qwerty@cluster0.8lybbco.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(myConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// Define MongoDB User schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

  // Register route
  app.post('/register', async (req, res) => {

  try {
    const { username, password } = req.body;

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
 
    // Create a new user
    const user = new User({ username, password: hashedPassword });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.log('user not created');
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Create a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new recipe
// app.post('/api/recipes', async (req, res) => {
//   try {
//     const { title, image, steps } = req.body;
//     const newRecipe = new Recipe({ title, image, steps });
//     const savedRecipe = await newRecipe.save();
//     res.json(savedRecipe);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// // Get all recipes
// app.get('/api/recipes', async (req, res) => {
//   try {
//     const recipes = await Recipe.find();
//     res.json(recipes);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});