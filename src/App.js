// import logo from './logo.svg';
import './App.css';
// import Navbar from './Navbar.js';
// import Body from './Body.js';
// import Login from './Login.js';
import Register from './Register.js';
import Login from './Login.js';

import {BrowserRouter, Routes, Route} from "react-router-dom";
// import Signup from './Signup.js';
import Home from './Home.js'
import RecipeDetail from './RecipeDetail.js';
import DialogBox from './DialogBox.js';

function App() {
  return (
        <>
           <BrowserRouter>
              <Routes>

                  <Route path="/" index element = {<Home/>} />
                  <Route path="/home" element = {<Home/>} />
                  <Route path="/recipe/:title" element={<RecipeDetail/>} />
                  <Route path="/newRecipe" element = {<DialogBox/>} />
                  <Route path="/home/newRecipe" element = {<DialogBox/>} />
                  <Route path="/register" element = {<Register/>} />
                  <Route path="/login" element = {<Login/>} />
                  
                  {/* home/newRecipe */}
              </Routes>
           </BrowserRouter>
        </>
  );
}

export default App;
