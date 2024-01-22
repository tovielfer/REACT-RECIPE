import Header from '../Header';
import { CardGroup, Segment, Dropdown } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Recipe from './Recipe'
import { useLocation } from 'react-router-dom/dist';
import { deleteRecipe, getRecipes } from '../service/recipes';
import { AddCategory, getCategories } from '../service/category';
const Recipes = () => {
    const { pathname } = useLocation()
    const { recipesList, categories } = useSelector(state => ({
        recipesList: state.recipe.recipes.filter(x =>
            pathname == '/allRecipes' || x.UserId == localStorage.getItem("userId")),
        categories: state.category.categories
    }))
    const [selectedCategory, setselectedCategory] = useState(null);
    const [selectedDuration, setselectedDuration] = useState(null);
    const [selectedDifficulty, setselectedDifficulty] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!recipesList.length)
            dispatch(getRecipes());
        if (!categories.length)
            dispatch(getCategories())
    }, [])
    const handleCategoryChange = (event, data) => {
        setselectedCategory(data.value.Id);
    };
    const handleDurationChange = (event) => {
        const selectedDuration = event.target.value;
        setselectedDuration(selectedDuration);
    };
    const handleDifficultyChange = (event, data) => {
        const selectedKey = data.options.find(option => option.value === data.value).key;
        setselectedDifficulty(selectedKey);
    };
    const defaultCategory = { key: -1, Name: 'כל הקטגוריות', value: "כל הקטגוריות" };
    const allCategories = [defaultCategory, ...categories];
    const categoryOptions = allCategories.map((category, index) => ({
        key: index,
        text: category.Name,
        value: category,
    }))
    const difficultyOptions = [
        { key: -1, text: 'כל הדרגות', value: "כל הקטגוריות" },
        { key: 1, text: 'קל', value: "קל" },
        { key: 2, text: 'בינוני', value: "בינוני" },
        { key: 3, text: 'קשה', value: "קשה" }
    ]
    return (
        <div>
            <Header page={pathname == '/userrecipes' ? 'המתכונים שלי' : 'מתכונים'} />
            <Segment>
                <Dropdown onChange={handleCategoryChange} placeholder='קטגוריה' search selection value={selectedCategory} noResultsMessage='לא נמצאה קטגוריה מתאימה' options={categoryOptions} />
                <input onChange={handleDurationChange} type='number'></input>
                <Dropdown onChange={handleDifficultyChange} placeholder='דרגת קושי' selection value={selectedDifficulty} options={difficultyOptions} />
            </Segment>



            <CardGroup style={{ justifyContent: "center" }}>
                {recipesList.map((recipe) => (!selectedCategory || recipe.CategoryId == selectedCategory) && (!selectedDuration || recipe.Duration <= selectedDuration) && (!selectedDifficulty || selectedDifficulty == -1 || selectedDifficulty == recipe.Difficulty) ?
                    <Recipe key={recipe.Id} recipe={recipe} />
                    : null)}
            </CardGroup>
        </div>
    )
}

export default Recipes;
