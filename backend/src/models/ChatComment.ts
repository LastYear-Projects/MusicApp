import mongoose,{Types} from "mongoose";


export interface IChatComment{
    user:Types.ObjectId,
    comment:string,
    date?:Date
}
    
const ChatCommentScheme = new mongoose.Schema<IChatComment>({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    date: {
        type: Date,
        default: function () {
            const now = new Date();
            now.setHours(now.getHours() + 3);
            return now;
        },
    },
});
const ChatComment= mongoose.model<IChatComment>("chatComment", ChatCommentScheme, "chatComments");
export default ChatComment