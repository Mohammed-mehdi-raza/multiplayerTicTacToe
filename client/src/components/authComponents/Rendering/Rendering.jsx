import React,{useContext} from 'react';
import Home from "../../authComponents/Home/Home.jsx";
import Register from "../../authComponents/Register/Register.jsx";
import Login from "../../authComponents/Login/Login.jsx";
import { LoginContext } from '../../../context/LoginContext.js';

const Rendering = () => {
    const {v}=useContext(LoginContext);
    switch(v){
        case "home":
            return(
                <Home/>
            )
        case "login":
            return(
                <Login/>
            )
        case "register":
            return(
                <Register/>
            )
        default:
            return(
                <Home/>
            )
    }
}

export default Rendering;
