import {fetchGames} from "../api/index.js";

export const fetchAllGames=(data)=>async(dispatch)=>{
    try {
        let res = await fetchGames(data);
        console.log(res.data.games);
        dispatch({type:"Fetch",payload:res.data.games});
    } catch (error) {
        console.log(error);
    }
}