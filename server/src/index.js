import express from "express";
import './db/conn.js';
import routes from "../routes/routes.js";
import cors from "cors";
import http from "http";
import {Server} from "socket.io";
import { multi } from "../socket/socket.js";

const app=express();

const PORT=process.env.PORT||5000;

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/',routes);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
});

multi(io);

server.listen(PORT,()=>{
    console.log(`server running on port:${PORT} `);
})