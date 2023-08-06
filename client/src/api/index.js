import axios from "axios";

// const url="http://localhost:5000";
const url="https://tictactoe-dwr6.onrender.com";
const API =axios.create({baseURL:url});

export const logIn=(formData)=>API.post('/signIn',formData);
export const fetchMe=(token)=>API.post('/fetchMe',{token:token});
export const logUp=(formData)=>API.post('/signUp',formData);
export const fetchGames=(data)=>API.post('/fetchAll',data);
export const storeResult=(data)=>API.post('/result',data);
