import user from "../models/user.js";
import game from "../models/games.js";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';

dotenv.config();

export const signIn=async(req,res)=>{
    const {username,password}=req.body;
    try {
        const data=await user.findOne({username});
        if(data.password===password){
            const token = jwt.sign(data._id.toJSON(),process.env.JWT_SECRET)
            res.status(200).json({data:{user:data,token},success:true});
        }else{
            res.status(200).json({message:"Password does not match",success:false});
        }
    } catch (error) {
        console.log(error);
        res.status(200).json({message:"User does not exist",success:false});
    }
}

export const fetchMe=async(req,res)=>{
    const {token} = req.body;
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const data=await user.findById(decoded)
        if(data){
            res.status(200).json({data:{user:data,token},success:true});
        }else{
            console.log(data); 
            res.status(200).json({message:"Password does not match",success:false});
        }
    } catch (error) {
        console.log(error);
        res.status(200).json({message:"User does not exist",success:false});
    }
}

export const signUp=async(req,res)=>{
    const data=req.body;
    try {
        const person =new user({
            name:data.name,
            username:data.username,
            email:data.email,
            password:data.password
        });
        await person.save();
        res.status(200).json({message:"Account succesfully created",success:true});
    } catch (error) {
        console.log(error);
        res.status(200).json({message:"User already exist",success:false});
    }
}

export const result=async(req,res)=>{
    const data = req.body;
    try {
        const play = new game({
            user1:data.user1,
            user2:data.user2,
            result:data.result
        })
        await play.save();
        res.status(200).json({success:true});
    } catch (error) {
        console.log(error);
        res.status(200).json({success:false});
    }
}

export const fetchAll= async(req,res)=>{
    const {email}=req.body;
    try {
        const games = await game.find({user1:email});
        res.status(200).json({success:true,games});
    } catch (error) {
        console.log(error);
        res.status(200).json({success:false});
    }
}