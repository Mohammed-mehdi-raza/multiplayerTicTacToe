import express from "express";
import { fetchAll, fetchMe, result, signIn,signUp } from "../controllers/controllers.js";

const Router=express.Router();

Router.post('/signIn',signIn);
Router.post('/signUp',signUp);
Router.post('/fetchMe',fetchMe)
Router.post('/result',result);
Router.post('/fetchAll',fetchAll);

export default Router;