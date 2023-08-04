import { Button } from '@mui/material';
import React,{useContext,useEffect} from 'react';
import './home.css';
import { HomeContext } from '../../../context/HomeContext.js';
import { fetchAllGames } from '../../../actions/game';
import {useDispatch, useSelector} from "react-redux";
import GameList from './GameList/GameList';

const Home = () => {
  const {setNav,setV,data}=useContext(HomeContext);
  const handleClick=()=>{
    setNav(true);
    setV("newGame");
  }
  const dispatch = useDispatch();
  useEffect(()=>{
    if(data !== null){
      dispatch(fetchAllGames({email:data.email}));
    }
  },[])
  const games = useSelector((state)=>state.game.games);
  return (
    <div className='home1'>
      <Button className="but" color="secondary" variant="contained" onClick={handleClick}>start a new game</Button>
      {
        games?
        <>
        <h4>History</h4>
        {games.map((game)=><GameList game={game} key={game._id}/>)}
        </>
        :
        <>
          <h1>No Games</h1>
          <h1>Found</h1>
        </>
      }
    </div>
  )
}

export default Home
