import {io} from "socket.io-client";

// const socket =io.connect("http://localhost:5000");
const socket =io.connect("https://tictactoe-dwr6.onrender.com/");

export default socket;