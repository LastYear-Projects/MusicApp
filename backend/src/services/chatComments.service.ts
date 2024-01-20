import ChatComment,{IChatComment} from "../models/ChatComment";

const createChatComment=async (chatComment:IChatComment) => {
    const newChatComment=new ChatComment(chatComment)
    await newChatComment.save()
    return newChatComment
}

export default {
    createChatComment,
}