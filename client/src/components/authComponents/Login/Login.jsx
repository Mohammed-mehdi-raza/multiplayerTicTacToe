import './Login.css';
import React,{useState}from 'react';
import { TextField,Button} from '@mui/material';
import {signIn} from "../../../actions/auth.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { logIn } from '../../../api/index.js';

function Login(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [data,setData]=useState({username:"",password:""});
    const [m,setM]=useState(false);
    const[message,setMessage]=useState("");
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }
    const handleSubmit=async()=>{
        console.log(data);
        const d=await logIn(data);
        console.log(d);
        if(d.data.success){
            dispatch(signIn(d.data.data));
            navigate("/home");
        }else{
            setM(true);
            setMessage(d.data.message);
        }
    }
    return(
        <div className="login">
            <h3>Login</h3>
            <h1>Please enter your details</h1>
            <h3>Username</h3>
            <TextField variant='outlined' label="Type your username here" name="username" value={data.username} onChange={handleChange}></TextField>
            <h3>Password</h3>
            <TextField variant='outlined' label="Type your password here" type="password" name="password" value={data.password} onChange={handleChange}></TextField>
            {
                m? <div className='message'><p className='p'>{message}</p></div>:<></>
            }
            <Button variant="contained" color="secondary" onClick={handleSubmit} className="item">Login</Button>
            <br/>
        </div>
    )
}

export default Login;