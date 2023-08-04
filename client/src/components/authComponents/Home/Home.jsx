import React,{useContext} from "react";
import { LoginContext } from "../../../context/LoginContext.js";
import './home.css';
import { Button } from "@mui/material";

function Home(){
    const {setNav,setV}=useContext(LoginContext);
    const handleClick=(e)=>{
        setNav(true);
        setV(e.target.name);
    }
    return(
        <div className="home">
            <h3 className="item1">async</h3>
            <h1 className="item2">tic tac</h1>
            <h1 className="item3">toe</h1>
            <Button className="item4" variant="contained" color="secondary" name="login" onClick={handleClick} >Login</Button>
            <Button className="item5" variant="contained" color="primary" name="register" onClick={handleClick}>Register</Button>
        </div>
    )
}

export default Home;