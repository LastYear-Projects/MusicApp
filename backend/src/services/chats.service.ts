import Chat,{IChat} from "../models/Chat"

const getChatByUsersIds = async (id1:string,id2:string) => {
  let chat = await Chat.findById({user1:id1,user2:id2});
  if(!chat){
    chat = await Chat.findById({user1:id2,user2:id1});
  }
  if(!chat){
    throw new Error("chat dosent exist")
  }
  return chat.populate("chatComments")
};

const getChatsByUserId = async (userId:string) => {
    const chats = await Chat.find({ $or: [{ user1: userId }, { user2: userId }] }).populate("user1 user2").exec();
    return chats
}

const createChat = async (chat:IChat) => {
    const newChat=new Chat(chat)
    await newChat.save()
    return newChat
}


export default {
    getChatByUsersIds,
    getChatsByUserId,
    createChat
}