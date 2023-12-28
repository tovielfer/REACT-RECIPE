
const initialState={
    user:null

}
const Reducer=(state=initialState, action)=>{

    switch(action.type){
        case "SET_USER":
          
            return{
                ...state, user:action.payload
            }
            console.log(state.user)
    }
  


}
export default Reducer;