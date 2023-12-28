import { Route, Routes } from 'react-router-dom';
import './App.css';
import EnterPage from './user/EnterPage';
import Login from './user/Login';
import SignUp from './user/SignUp';
import Home from './Home';
import Recipe from './recipes/Recipe';
import Header from './Header';
import 'react-hook-form';
import AddRecipe from './recipes/addRecipe';
import Recipes from './recipes/Recipes';
import Buy from './Buy';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<EnterPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/userrecipes' element={<Recipes />} />
        <Route path='/allRecipes' element={<Recipes />} />
        <Route path='/buy' element={<Buy />} />
        <Route path='/addRecipe' element={<AddRecipe />} />
        <Route path='/addCategory' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
