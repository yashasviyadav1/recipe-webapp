
import React from 'react';
import {useState} from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar.js';
import './main.css'; 
import RecipeCard from './RecipeCard.js';
import cloudsImage from './assets/clouds.jpg';
// import {useState } from 'react';
import DialogBox from './DialogBox.js';

export default function Home(){

    const YOUR_APP_ID = 'f643b351';
    const YOUR_APP_KEY = '5d8b24264585a58d6d09da763807b561';
    

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [recipes, setRecipes] = useState([
    // Initial hardcoded recipes
    { title: "Burger", recipeSteps: "1. boil  2. fry", img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: "Chana Masala", recipeSteps: "1. boil  2. fry", img: require('./assets/chanaMasala.jpg') },
    { title: "Yellow Rice", recipeSteps: "1. boil  2. fry", img: require('./assets/chanaMasala.jpg') },
  ]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.edamam.com/search?q=${searchQuery}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`);
      const data = await response.json();

      if (data.hits && data.hits.length > 0) {
        setSearchResults(data.hits);
      } else {
        console.error('No recipes found');
      }
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  
  const handleNewRecipeSubmit = (title, image) => {
    // Handle the new recipe submission here
    if(title.trim() === '' || image == null){
        alert('All fields required');
        return;
    }

    setRecipes(prevRecipes => [
        ...prevRecipes, 
        {title, recipeSteps: '', img: image},
    ])

    // You may want to clear the search results as well
    setSearchResults([]);

    // For now, let's log the values to the console
    console.log('New Recipe Title:', title);
    console.log('New Recipe Image:', image.value);
  };

    return(
        <>
            <Navbar/>
            <div className='header-container'>

            
                <h1 className="tasty-dish-text"> 
                    "Cook, Share, and Enjoy Tiny Triumphs!"
                </h1>

                <DialogBox className='create-recipe-btn' onSubmit={handleNewRecipeSubmit} />

                <div className='food-input-field-container'>
                    {/* <div className='search-icon-container'></div> */}
                    <svg className="search-icon-svg" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
<path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
</svg>
                    <input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className = 'food-input-field'
                        placeholder='What are u cooking today?'
                    />
                    <button className='food-search-button'  onClick={handleSearch}> Search </button>
                </div>   



                <div className='recipe-cards-container'>
                {/* Display search results */}
                {searchResults.map((result) => (
                    <RecipeCard
                    key={result.recipe.label}
                    title={result.recipe.label}
                    recipeSteps={result.recipe.ingredientLines.join(', ')}
                    img={result.recipe.image}
                    />
                ))}

                <div className='recipe-cards-container'>
                    {/* Display recipes */}
                    {recipes.map((recipe, index) => (
                        <RecipeCard
                        key={index} // You may want to use a unique identifier for the key
                        title={recipe.title}
                        recipeSteps={recipe.recipeSteps}
                        img={recipe.img}
                        />
                    ))}
                </div>
        </div>



        {/* original cards */}
{/*                 
                <div className='recipe-cards-container'>

                    <RecipeCard title="Burger" recipeSteps="1. boil  2. fry" img='https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                    <RecipeCard title="Chana Masala" recipeSteps="1. boil  2. fry" img={require('./assets/chanaMasala.jpg')} />
                    
                </div> */}

            </div>

        </>

    );
} 