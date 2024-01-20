import ChatComment,{IChatComment} from "../models/ChatComment";
import Chat from "../models/Chat";

const createChatCommentByChatId = async (chatId:string,chatComment:IChatComment) => {
    const chat= await Chat.findById(chatId)
    if(!chat){
        throw new Error("chat dosent exist")
    }
    const newChatComment=new ChatComment(chatComment)
    await newChatComment.save()
    return newChatComment
}

export default {
    createChatCommentByChatId,
}