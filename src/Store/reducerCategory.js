const initalseState = {
    categories: []
}

const reducerCategory = (state = initalseState, action) => {
    switch (action.type) {
       
        case "SET_CATEGORY":
            return { ...state, categories: action.data }
        case "ADD_CATEGORY": {
            const categories = [...state.categories];
            categories.push(action.data);
            return { ...state, categories }
        }
      
        default: return { ...state }
    }
}
export default reducerCategory;