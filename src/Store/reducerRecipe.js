
const initalseState = {
    recipes: []
}

const reducerRecipe = (state = initalseState, action) => {
   
    switch (action.type) {
        case "SET_RECIPE":
            return { ...state, recipes: action.data }
        case "ADD_RECIPE": {
            const recipes = [...state.recipes];
            recipes.push(action.data);
            return { ...state, recipes }
        }
        case "EDIT_RECIPE": {
            const recipes = [...state.recipes];
            const findIndex = recipes.findIndex(x => x.Id === action.data.Id);
            recipes[findIndex] = action.data;
            return { ...state, recipes }
        }
        case "DELETE_RECIPE": {
            const recipes=state.recipes.filter(x=>x.Id!==action.data)
            return { ...state ,recipes}
        }
        default: return { ...state }
    }
}

export default reducerRecipe;