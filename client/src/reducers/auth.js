

const authReducer=(state={authData:null},action)=>{
    switch(action.type){
        case "LOG_IN":
            return {...state,authData:action.payload};
        case "LOG_OUT":
            return {...state,authData:null};
        default:
            return state;
    }
}

export default authReducer;