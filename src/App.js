import { Route, Routes } from 'react-router-dom';
import './App.css';
import EnterPage from './user/EnterPage';
import Login from './user/Login';
import SignUp from './user/SignUp';
import Home from './pages/Home';
import Recipe from './recipes/Recipe';
import 'react-hook-form';
import AddRecipe from './recipes/AddRecipe';
import Recipes from './recipes/Recipes';
import Buy from './pages/ShoppingList';


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
        <Route path='/recipe/add' element={<AddRecipe />} />
        <Route path='/recipe/edit' element={<AddRecipe />} />
      </Routes>
    </>
  );
}

export default App;
