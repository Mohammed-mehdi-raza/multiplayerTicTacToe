import mongoose from "mongoose";

const Schema=mongoose.Schema;

const games=new Schema({
    user1:{
        type:String,
        require:true
    },
    user2:{
        type:String,
        require:true
    },
    result:String,
    time:{
        type:Date,
        default:new Date()
    }
})

const game=mongoose.model('games',games);

export default game;