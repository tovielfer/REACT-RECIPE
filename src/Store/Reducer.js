

const initialState = {
    user: null,
    currentRecipe: null
}
const Reducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET_USER": {
            return { ...state, user: action.payload }
        } // V V V
        // case "SET_RECIPE":
        //     return { ...state, recipes: action.data }
        // case "ADD_RECIPE":
        //     const recipes = [...state.recipes];
        //     state.recipes.push(action.recipe);
        //     return { ...state, recipes }
        // case "EDIT_RECIPE": {
        //     const recipes = [...state.recipes];
        //     const findIndex = recipes.findIndex(x => x.Id == action.recipe.Id);
        //     recipes[findIndex] = action.recipe;
        //     return { ...state, recipes }
        // }
        // case "DELETE_RECIPE": {
        //     const recipes = state.recipes.filter(x => x.id != action.id);
        //     return { ...state, recipes }
        // }
        default: return { ...state }
    }

}
export default Reducer;