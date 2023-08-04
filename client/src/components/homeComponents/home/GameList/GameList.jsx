import React from 'react';
import "./GameList.css";

const GameList = ({game}) => {
  return (
    <div className='gameElement'>
      <h4>Game Against {game.user2}</h4>
      <h4>on {game.time.split('T')[0]}</h4>
      <h4>Result: {game.result}</h4>
    </div>
  )
}

export default GameList;
