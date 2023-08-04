import React,{useContext} from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import { HomeContext } from '../../../context/HomeContext.js';

const Navbar = () => {
    const {setNav,setV}=useContext(HomeContext);
    const handleSubmit=()=>{
        setNav(false);
        setV("home");
    }
    return (
        <div className='Navbar'>
            <IconButton size="large" onClick={handleSubmit}>
                <ArrowBackIosNewIcon/>
            </IconButton>
        </div>
    )
}

export default Navbar
