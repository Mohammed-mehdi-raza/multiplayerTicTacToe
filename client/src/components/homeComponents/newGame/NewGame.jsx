import React,{useContext,useState} from 'react';
import { TextField,Button } from '@mui/material';
import './newGame.css';
import { HomeContext } from '../../../context/HomeContext.js';
import socket from "../../../socket/socket.js";

const NewGame = () => {
    const {setV,data}=useContext(HomeContext);
    const [email,setEmail]=useState("");

    const handleChange=(e)=>{
        setEmail(e.target.value);
    }

    const handleClick=()=>{
        socket.emit("new game",{user:data.email,opponent:email});
    }
    
    return (
        <div className='newGame'>
            <h3>Start a new game</h3>
            <h1>Whom do you want to play with?</h1>
            <h3>Email</h3>
            <TextField variant='outlined' label="Type their email here" name="email" value={email} onChange={handleChange}></TextField>
            <Button className="but1" variant="contained" color="secondary" onClick={handleClick}>Start game</Button>
        </div>
    )
}

export default NewGame;
