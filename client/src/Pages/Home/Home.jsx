import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {HomeContext} from "../../context/HomeContext.js";
import Navbar from "../../components/homeComponents/Navbar/Navbar.jsx";
import Rendering from "../../components/homeComponents/rendering/Rendering.jsx";
import './Home.css';
import { useNavigate } from "react-router-dom";
import socket from "../../socket/socket.js";
import {Box,Button,Modal} from "@mui/material";
import { signOut } from "../../actions/auth.js";
import LogoutIcon from '@mui/icons-material/Logout';

function Home(){
    const data=useSelector((state)=>state.auth.authData);
    const [d,setD]=useState({user:"",opponent:"",name:""})
    const [nav,setNav]=useState(false);
    const [opponent,setOpponent]=useState({name:"",email:""});
    const [open,setOpen]=useState(false);
    const [f,setF]=useState(false);
    const[str,setStr]=useState("");
    const [h,setH]=useState(false);
    const [v,setV]=useState("home");
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const accept=()=>{
        setOpen(false);
        socket.emit("accepted",{user:d.user,opponent:d.opponent});
        setOpponent({name:d.name,email:d.user});
        setH(true);
        setNav(true);
        setV("game");
    }

    const reject=()=>{
        setOpen(false);
        socket.emit("declined",{user:d.user})
    }

    useEffect(()=>{
        if(data !== null){
            socket.emit("online",{email:data.email});
        }else{
            navigate('/');
        }
        const handleFocus = async () => {
            if(data !== null){
                socket.emit("online",{email:data.email});
            }else{
                navigate('/');
            }
        };
        window.addEventListener('focus', handleFocus);

        socket.on("game request",(data)=>{

            setOpen(true);
            setF(true);
            setStr(`Game request from ${data.name}`);
            setD(data);
            
            // if(window.confirm(`game request from ${data.name}`)){
            //     socket.emit("accepted",{user:data.user,opponent:data.opponent});
            //     setOpponent({name:data.name,email:data.user});
            //     setH(true);
            //     setNav(true);
            //     setV("game");
            // }else{
            //     socket.emit("declined",{user:data.user})
            // }
        });

        socket.on("user offline",()=>{
            // alert("user currently offline");
            setOpen(true);
            setStr("user currently offline");
        })

        socket.on("accepted",(data)=>{
            setOpponent({name:data.name,email:data.email})
            setNav(true);
            setV("game");
        })

        socket.on("declined",()=>{
            // alert("opponent declined");
            setOpen(true);
            setStr("opponent declined");
        })
        const handleBlur = async() => {
            console.log("aana pure");
            socket.emit("offline");
        };
        window.addEventListener('blur', handleBlur);
        return()=>{
            // socket.emit("offline");
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
        };
    },[socket,data]);

    const logOut=()=>{
        dispatch(signOut());
    }

    return(
        <div className="Home">
            <HomeContext.Provider value={{setNav,v,setV,data,opponent,h,setH}}>
                {nav?<Navbar/>:<div className="logOut"><h2>Your Games</h2><Button onClick={logOut}><LogoutIcon/></Button></div>}
                <Rendering/>
                <Modal open={open} onClose={reject} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box className="box1">
                        <p>{str}</p>
                        {
                            f?<Button variant="contained" color="primary" onClick={accept}>Accept</Button>:<></>
                        }
                    </Box>
                </Modal>
            </HomeContext.Provider>
        </div>
    )
}

export default Home;