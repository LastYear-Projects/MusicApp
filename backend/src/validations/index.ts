import {Router} from 'express';
const router = Router();
import userController from '../controllers/users.controller';
import jwt from'jsonwebtoken';
import{Request, Response, NextFunction} from 'express';

//checks if the token has been generated by the server
const checkToken = (req:Request, res:Response, next:NextFunction) => { 
    const {token} = req.body;
    console.log(token);
    if (!token) {
        return res.status(401).json({message: "No token provided"});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            return res.status(403).json({message: "Invalid token"});
        }
        next();
    });
    
}





//checks if the user has filled all the fields correctly
const registerAuth = (req:Request, res:Response, next:NextFunction) =>{
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }
    //regex for email
    if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
        return res.status(400).json({ error: "Please enter a valid email" });
    }

    if(password.length < 8){
        return res.status(400).json({ error: "Password must be at least 8 characters" });
    }
    //check if name contains digits
    if(name.match(/\d/)){
        return res.status(400).json({ error: "Name must not contain digits" });
    }
    next();
}




//checks if the user has filled all the fields correctly
const updatedUserAuth = (req:Request, res:Response, next:NextFunction) => {
    const {name, email, password} = req.body.updatedUser;
    
    //regex for email
    if(email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
        return res.status(400).json({ error: "Please enter a valid email" });
    }
    if(password && password.length < 8){
        return res.status(400).json({ error: "Password must be at least 8 characters" });
    }
    //check if name contains digits
    if(name && name.match(/\d/)){
        return res.status(400).json({ error: "Name must not contain digits" });
    }
    next();
}

//checks if the user is an admin
const adminAuth = (req:Request, res:Response, next:NextFunction) =>{
    const token = req.body.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
        return res.status(403).json({message: "Invalid token"});
    }
    if(decodedToken.isAdmin === false){
        return res.status(403).json({message: "You must be an admin to access this resource"});
    }
    next();
}

//checks if the user is the song creator
const songCreatorAuth = (req:Request, res:Response, next:NextFunction) =>{
    const {token,song} = req.body;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if(decodedToken.id !== song.creator){
        return res.status(403).json({message: "You must be the song creator to access this resource"});
    }
    next();
}



export default {
    checkToken,
    registerAuth,
    adminAuth,
    updatedUserAuth,
    songCreatorAuth
}