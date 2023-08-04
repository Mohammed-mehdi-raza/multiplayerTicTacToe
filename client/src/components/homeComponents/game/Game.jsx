import React,{useState,useContext,useEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Button } from '@mui/material';
import "./game.css"
import { HomeContext } from '../../../context/HomeContext.js';
import socket from '../../../socket/socket.js';
import { storeResult } from '../../../api';

const Display=({i,j,m})=>{
    switch(m[i][j]){
        case 1:
            return <CloseIcon color="primary" fontSize='large'/>
        case 2:
            return <RadioButtonUncheckedIcon color="secondary" fontSize='large'/>
        default:
            <></>
    }
}

const DisplayWinner=({i})=>{
    switch(i){
        case 1:
            return <p>You win</p>
        case 2:
            return <p>You lose</p>
        case 3:
            return <p>It's a draw</p>
        default:
            return <p>Your move</p>
    }
}

const Game = () => {

    const [m,setM]=useState([
        [0,0,0],
        [0,0,0],
        [0,0,0],
    ]);
    const [t,setT]=useState([
        [0,0,0],
        [0,0,0],
        [0,0,0],
    ]);
    const [win,setWin]=useState(null);
    const {opponent,h,setH,data,setV}=useContext(HomeContext)
    const handleMove=(i,j)=>{
        if(m[i][j]===0){
            let copy=[
                [0,0,0],
                [0,0,0],
                [0,0,0],
            ]
            for(let k=0;k<t.length;k++){
                for(let n=0;n<t[0].length;n++){
                    copy[k][n]=t[k][n];
                }
            }
            copy[i][j]=1
            setM(copy);
        }
    }

    // const fun=async()=>{
    //     await checkWinner();
    // }

    const handleClick=()=>{
        checkWinner(m);
        if(m!==t){
            socket.emit("set_move",{opponent:opponent,m:m});
            setH(true);
        }
    }

    useEffect(()=>{
        socket.on("get_move",(dat)=>{
            let copy=[
                [0,0,0],
                [0,0,0],
                [0,0,0],
            ]
            for(let k=0;k<dat.m.length;k++){
                for(let n=0;n<dat.m[0].length;n++){
                    if(dat.m[k][n]===1){
                        copy[k][n]=2
                    }else if(dat.m[k][n]===2){
                        copy[k][n]=1
                    }else{
                        copy[k][n]=dat.m[k][n];
                    }
                }
            }
            setM(copy);
            setT(copy);
            checkWinner(copy);
            if(win===null){
                setH(false);
            }
        })
    },[socket]);

    useEffect(()=>{
        if(win!==null){
            if(win===1){
                storeResult({user1:data.email,user2:opponent.name,result:"win"});
            }else if(win===2){
                storeResult({user1:data.email,user2:opponent.name,result:"lose"});
            }
            else{
                storeResult({user1:data.email,user2:opponent.name,result:"draw"});
            }
            setH(false); 
            setV("home");
        }
    },[win])

    const checkWinner=(q)=>{
        if(win===null){
            for (let index = 0; index < q.length; index++) {
                const row = q[index];
                if (row.every((cell) => cell === 1)) {
                  setWin(1);
                  return;
                } else if (row.every((cell) => cell === 2)) {
                  setWin(2);
                  return;
                }
            }
            for (let i = 0; i < 3; i++) {
                const column = q.map((row) => row[i]);
                if (column.every((cell) => cell === 1)) {
                  setWin(1);
                  return;
                } else if (column.every((cell) => cell === 2)) {
                  setWin(2);
                  return;
                }
            }
            const diagonal1 = [q[0][0], q[1][1], q[2][2]];
            const diagonal2 = [q[0][2], q[1][1], q[2][0]];
            if (diagonal1.every((cell) => cell === 1)) {
                setWin(1);
                return;
            } else if (diagonal1.every((cell) => cell === 2)) {
                setWin(2);
                return;
            } else if (diagonal2.every((cell) => cell === 1)) {
                setWin(1);
                return;
            } else if (diagonal2.every((cell) => cell === 2)) {
                setWin(2);
                return;
            } else if (q.flat().every((cell) => cell !== 0)) {
                setWin(3);
                return;
            } else {
                setWin(null);
                return;
            }
        }
    }

    return (
        <div className='game'>
            <div className="box">
                <h2>Game with {opponent.name}</h2>
                <p>Your piece</p>
                <div className="piece"><CloseIcon color="primary" fontSize='large'/></div>
            </div>
            <div className="b1">
                <div className="move">{<DisplayWinner i={win}/>}</div>
                <div className="board">
                    <div className={h ? "i i1 dis" : "i i1"} name="one" onClick={()=>handleMove(0,0)}>{<Display i={0} j={0} m={m}/>}</div>
                    <div className={h ? "i i2 dis" : "i i2"} name="two" onClick={()=>handleMove(0,1)}>{<Display i={0} j={1} m={m}/>}</div>
                    <div className={h ? "i i3 dis" : "i i3"} name="three" onClick={()=>handleMove(0,2)}>{<Display i={0} j={2} m={m}/>}</div>
                    <div className={h ? "i i4 dis" : "i i4"} name="four" onClick={()=>handleMove(1,0)}>{<Display i={1} j={0} m={m}/>}</div>
                    <div className={h ? "i i5 dis" : "i i5"} name="five" onClick={()=>handleMove(1,1)}>{<Display i={1} j={1} m={m}/>}</div>
                    <div className={h ? "i i6 dis" : "i i6"} name="six" onClick={()=>handleMove(1,2)}>{<Display i={1} j={2} m={m}/>}</div>
                    <div className={h ? "i i7 dis" : "i i7"} name="seven" onClick={()=>handleMove(2,0)}>{<Display i={2} j={0} m={m}/>}</div>
                    <div className={h ? "i i8 dis" : "i i8"} name="eight" onClick={()=>handleMove(2,1)}>{<Display i={2} j={1} m={m}/>}</div>
                    <div className={h ? "i i9 dis" : "i i9"} name="nine" onClick={()=>handleMove(2,2)}>{<Display i={2} j={2} m={m}/>}</div>
                </div>
                <Button className="but2" variant="contained" fullWidth color="secondary" disabled={h} onClick={handleClick}>Submit</Button>
            </div>
        </div>
    )
}

export default Game;
