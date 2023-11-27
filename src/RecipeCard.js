import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import { Link } from 'react-router-dom';


export default function RecipeCard({ title, img }) {
  return (
    
    <Link to={`/recipe/${encodeURIComponent(title)}`}>
    
    <div className="card-div">

        <img className="card-image" src={img} alt={title} />
        <h3 className='card-title'>{title}</h3>
        {/* <p>{recipeSteps}</p> */}

    </div>
    </Link>

  );
}