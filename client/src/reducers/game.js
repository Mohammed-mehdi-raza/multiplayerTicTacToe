

const gameReducer=(state={games:[]},action)=>{
    switch(action.type){
        case "Fetch":
            return {...state,games:action.payload}
        default:
            return state;
    }
}

export default gameReducer;