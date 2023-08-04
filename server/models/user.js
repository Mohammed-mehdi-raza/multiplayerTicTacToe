import mongoose from "mongoose";

const Schema=mongoose.Schema;

const users =new Schema({
    name:String,
    username:String,
    email:{
        type:String,
        unique:true
    },
    password:String
});

const user =mongoose.model('users',users);
export default user;