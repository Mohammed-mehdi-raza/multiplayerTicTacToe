import './Register.css';
import React,{useState} from 'react';
import { TextField,Button} from '@mui/material';
import {logUp} from "../../../api/index.js";


function Register(){
    const [data,setData]=useState({name:"",username:"",email:"",password:""});
    const [m,setM]=useState(false);
    const [disable,setDisable]=useState(false);
    const [bg,setBg]=useState("");
    const[message,setMessage]=useState("");
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }
    const handleSubmit=async()=>{
        const d=await logUp(data);
        if(d.data.success){
            setBg("green");
            setDisable(true);
            setM(true);
            setMessage(d.data.message);
        }else{
            setBg("red");
            setM(true);
            setMessage(d.data.message);
        }
    }
    return(
        <div className="register">
            <h3>Create account</h3>
            <h1>Let's get to know you better</h1>
            <h3>Your name</h3>
            <TextField variant='outlined' label="Type your name here" type="text" name="name" value={data.name} onChange={handleChange}></TextField>
            <h3>Username</h3>
            <TextField variant='outlined' label="Type your username here" name="username" value={data.username} onChange={handleChange}></TextField>
            <h3>Email</h3>
            <TextField variant='outlined' label="Type your email here" name="email" value={data.email} onChange={handleChange}></TextField>
            <h3>Password</h3>
            <TextField variant='outlined' label="Type your password here" type="password" name="password" value={data.password} onChange={handleChange}></TextField>
            {
                m? <div className={bg}><p className='p'>{message}</p></div>:<></>
            }
            <br />
            <Button variant="contained" color="secondary" onClick={handleSubmit} disabled={disable}>Register</Button>
            <br/>
        </div>
    )
}

export default Register;