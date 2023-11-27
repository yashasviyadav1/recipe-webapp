import React from 'react';
import ReactDOM from 'react-dom';

export default function RecipeInputForm({onClose}){

    return(
        <div className='recipe-input-form'>
            <input
                placeholder='Recipe Title'
            />

            <input
                placeholder='image web src'
            />
            
            <button onclick={onClose}>Save Recipe</button>
        </div>
    )
}