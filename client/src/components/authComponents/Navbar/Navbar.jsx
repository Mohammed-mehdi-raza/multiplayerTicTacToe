import React,{useContext} from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import { LoginContext } from '../../../context/LoginContext.js';

function Navbar(){
    const {setNav,setV}=useContext(LoginContext);
    const handleSubmit=()=>{
        setNav(true);
        setV("home");
    }
    return(
        <div className="nav">
            <IconButton size="large" onClick={handleSubmit}>
                <ArrowBackIosNewIcon/>
            </IconButton>
        </div>
    )
}

export default Navbar;