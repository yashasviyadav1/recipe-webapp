
import React from 'react';
// import ReactDOM from 'react-dom';
import './main.css';

export default function Signup(){

    return(
        <>

        <div className="login-container-div">

            <p>Sign-Up</p>

            <input 
                className='input-field'
                type="text"
                placeholder='Name'
            /> 

            <input 
                className='input-field'
                type="text"
                placeholder='password'
            /> 

            <button >Submit</button> 
        
        </div>

        </>

    );

}