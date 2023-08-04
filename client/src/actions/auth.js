import Cookies from "universal-cookie";
import { fetchMe } from "../api";

export const signIn=(formData)=>async(dispatch)=>{
    try{
        const cookie = new Cookies();
        cookie.set('token',formData.token,{path:'/',maxAge:86400});
        dispatch({type:"LOG_IN",payload:formData.user});
    }catch(e){
        console.log(e);
    }
}

export const fetchDataFromToken=(token)=>async(dispatch)=>{
    try{
        const res = await fetchMe(token);
        // const cookie = new Cookies();
        // cookie.set('token',res.data.token,{path:'/',maxAge:86400});
        dispatch({type:"LOG_IN",payload:res.data.data.user});
    }catch(e){
        console.log(e);
    }
}

export const signOut=()=>(dispatch)=>{
    try{
        const cookie = new Cookies();
        cookie.remove('token');
        dispatch({type:"LOG_OUT"});
    }catch(e){
        console.log(e);
    }
}