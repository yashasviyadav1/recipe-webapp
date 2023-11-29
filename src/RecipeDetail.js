
//---------------------------------------
// RecipeDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './main.css';

const YOUR_APP_ID = 'f643b351';
const YOUR_APP_KEY = '5d8b24264585a58d6d09da763807b561'; 

function RecipeDetail() {
  const { title } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        // Make a fetch request to Edamam API to get the recipe details
        const response = await fetch(`https://api.edamam.com/search?q=${title}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`);
        const data = await response.json();

        // Update 'recipeDetails' state with the fetched data
        if (data.hits && data.hits.length > 0) {
          setRecipeDetails(data.hits[0].recipe);
        } else {
          // Handle the case where no recipe is found
          console.error('Recipe not found');
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    // Call the fetchRecipeDetails function
    fetchRecipeDetails();
  }, [title]);

  if (!recipeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-details-container">
      <h1>Recipe for '{recipeDetails.label}' </h1>

      <div className='hr-div'></div>

      <img className='recipe-details-image' src={recipeDetails.image} />
      
      {/* <p>{recipeDetails.ingredientLines.join(', ')}</p> */}
      <h3>Ingredients:</h3>
      {recipeDetails.ingredientLines.map((ingredient, index) => (
        <p key={index}>{"•   " + ingredient}</p> 
      ))}
    </div>
  );
} 

export default RecipeDetail;
