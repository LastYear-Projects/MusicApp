import chatService from '../services/chats.service';
import chatCommentsService from '../services/chatComments.service';
import usersController from './users.controller';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Token from '../utils/tokenType';
import { Types } from 'mongoose';
import Chat from '../models/Chat';
const getChatByUsersIds = async (req:Request, res:Response) => {
  try {
    const { token, userId2 } = req.body;
    const user1=jwt.decode(token) as Token
    const chat = await chatService.getChatByUsersIds(user1.id, userId2);
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getChatsByUserId = async (req:Request, res:Response) => {
 try{
    const { token } = req.body;
    const user=jwt.decode(token) as Token
    const chats = await chatService.getChatsByUserId(user.id);
    res.status(200).json(chats);
 }catch(error){
    res.status(500).json({ message: error.message });
 }
}

const createChat = async (userId1:string, userId2:string) => {
    try {
        const chat=new Chat({user1:new Types.ObjectId(userId1), user2:new Types.ObjectId(userId2)});
        const createdChat = await chatService.createChat(chat);
        return createdChat
    } catch (error) {
        return error;
    }
}
const addCommentToChat = async (req:Request, res:Response) => { // userId2,token,comment
    try{
        const {token,userId2,comment}=req.body;
        const createdChatComment= await chatCommentsService.createChatComment(comment);
        const user1=jwt.decode(token) as Token
        const isExist=await chatService.getChatByUsersIds(user1.id,userId2);
        let chat=isExist;
        if(!isExist){
            chat=await createChat(user1.id,userId2)
            await usersController.addChatToUser(user1.id,chat._id)
            await usersController.addChatToUser(userId2,chat._id)
        }
        chat.chatComments.push(createdChatComment._id);
        await Chat.findOneAndUpdate({_id:chat._id},chat);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}


export default {
    getChatByUsersIds,
    getChatsByUserId,
    addCommentToChat,
}