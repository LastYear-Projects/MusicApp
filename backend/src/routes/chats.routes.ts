import {Router} from 'express';
import validations from '../validations';
import chatController from '../controllers/chats.controller';
const router=Router();

router
.post("/get-chat",validations.checkToken,chatController.getChatByUsersIds)
.post("/get-chats",validations.checkToken,chatController.getChatsByUserId)
.post("/add-comment",validations.checkToken,chatController.addCommentToChat)

export default router;