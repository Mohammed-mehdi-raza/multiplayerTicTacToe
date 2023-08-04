import user from "../models/user.js";

const online=[];

export const multi=(io)=>{
    io.on("connection",(socket)=>{
        
        socket.on("online",(data)=>{
            let index=online.findIndex(i=>i.email===data.email);
            console.log("online");
            if(index===-1){
                online.push({
                    id:socket.id,
                    email:data.email
                });
            }
        });

        socket.on("new game",async(data)=>{
            console.log(online);
            let index=online.findIndex(i=>i.email===data.opponent);
            if(index!==-1){
                let temp=await user.findOne({email:data.user});
                socket.broadcast.to(online[index].id).emit("game request",{user:data.user,opponent:data.opponent,name:temp.username});
            }else{
                socket.emit("user offline");
            }
        });

        socket.on("accepted",async(data)=>{
            let index = online.findIndex(i=>i.email===data.user);
            let temp=await user.findOne({email:data.opponent});
            socket.broadcast.to(online[index].id).emit("accepted",{name:temp.username,email:data.opponent});
        });

        socket.on("declined",(data)=>{
            let index = online.findIndex(i=>i.email===data.user);
            if(index!==-1){
                socket.broadcast.to(online[index].id).emit("declined");
            }else{
                console.log("ye to hona hi tha!");
            }
        });

        socket.on("set_move",(data)=>{
            let index = online.findIndex(i=>i.email===data.opponent.email);
            if(index!==-1){
                socket.broadcast.to(online[index].id).emit("get_move",{m:data.m});
            }else{
                console.log("kya yaar");
            }
        })

        socket.on("offline",()=>{
            let index=online.findIndex(i=>i.id===socket.id);
            console.log("offline");
            if(index>-1){
                online.splice(index,1);
            }
        })
    })
}