import { Router } from "express";
import {
    createConversation,
    getConversationById,
    getConversations
} from '../controllers/conversation.controller.js';
import requireAuth from "../middlewares/auth.middleware.js";
import asyncHandlerMiddleware from '../middlewares/asyncHandlerMiddleware.js';


const conversationRoutes = Router();

conversationRoutes.get("/conversations", asyncHandlerMiddleware(getConversations));
conversationRoutes.post("/conversations", requireAuth, asyncHandlerMiddleware(createConversation));
conversationRoutes.get("/conversations/:id", requireAuth, asyncHandlerMiddleware(getConversationById))


export default conversationRoutes;