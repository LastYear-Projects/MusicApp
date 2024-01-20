import mongoose,{Types} from "mongoose"

export interface IChat{
 user1:Types.ObjectId,
 user2:Types.ObjectId,
 chatComments:Types.ObjectId[]
}

const ChatScheme = new mongoose.Schema<IChat>({
 user1: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "user",
   required: true,
 },
 user2: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "user",
   required: true,
 },
 chatComments: [
   {
     type: mongoose.Schema.Types.ObjectId,
     ref: "chatComment",
     required: true,
   },
 ],
});
const Chat= mongoose.model<IChat>("chat", ChatScheme, "chats");
export default Chat