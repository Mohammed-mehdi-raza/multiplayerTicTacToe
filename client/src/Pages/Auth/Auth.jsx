import React,{useEffect, useState} from "react";
import Navbar from '../../components/authComponents/Navbar/Navbar.jsx';
import {LoginContext} from "../../context/LoginContext.js";
import Rendering from "../../components/authComponents/Rendering/Rendering.jsx";
import './Auth.css';
import Cookies from "universal-cookie";
import { fetchMe } from "../../api/index.js";
import { fetchDataFromToken } from "../../actions/auth.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function Auth(){
    const [nav,setNav]=useState(false);
    const [v,setV]=useState("home");
    const cookie = new Cookies();
    const token = cookie.get('token');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        if(token!==undefined){
            dispatch(fetchDataFromToken(token));
            navigate('/home');
        }
    },[token]);
    return(
        <div className="Auth">
            <LoginContext.Provider value={{setNav,v,setV}}>
                {nav?<Navbar/>:<></>}
                <Rendering/>
            </LoginContext.Provider>
        </div>
    )
}

export default Auth;