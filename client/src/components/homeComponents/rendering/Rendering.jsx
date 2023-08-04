import React,{useContext} from 'react';
import { HomeContext } from '../../../context/HomeContext';
import Home from "../home/Home.jsx";
import NewGame from "../newGame/NewGame.jsx";
import Game from "../game/Game.jsx";

const Rendering = () => {
    const {v}=useContext(HomeContext);
    switch(v){
        case "home":
            return(
                <Home/>
            )
        case "newGame":
            return(
                <NewGame/>
            )
        case "game":
            return(
                <Game/>
            )
        default:
            return(
                <Home/>
            )
    }
}

export default Rendering;
