
import axios from "axios";
import { useState, useEffect } from "react";

const k = { Id: 1, Name: "עוגה כושית", UserId: 1, CategoryId: 2, Img: "https://img.mako.co.il/2023/03/27/oga_pereg_choclet_autoOrient_i.jpg", Duration: "50", Difficulty: 1, Description: "עוגה קלה להכנה", Ingrident: [] };
const bb = [{ Id: 1, Name: "חלבי" }, { Id: 2, Name: "בשרי" }]

const Recipe = ({ recipeId = 1 }) => {
    const [categoryList, setCategoryList] = useState(bb);
    const [recipe, setRecipe] = useState(k);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/category`)
            .then(c => {
                setCategoryList(c.data);
                console.log(JSON.stringify(categoryList));
            });
        axios.get(`http://localhost:8080/api/recipe`)
            .then(re => {
                console.log(recipeId);
                setRecipe(re.data[recipeId]);
                console.log(recipe);
            })
    }, [])
    const difficulties = ["", "", ""]
    return (
        <div>
            <h2>{recipe?.Name}</h2>
            <img src={recipe?.Img} />
            <h3>{recipe?.Description}</h3>
            <p>{categoryList?.filter(c => c.Id == recipe?.CategoryId)}</p>

            {/* <p>{difficulties[recipe?.Difficulty]}</p> */}
            <p>{recipe?.Duration} דקות</p>
        </div>
    )
}

export default Recipe