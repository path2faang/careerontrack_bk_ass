import { Router } from "express";
import {
    createConversation,
    getConversationById,
    getConversations
} from '../controllers/conversation.controller.js';
import requireAuth from "../middlewares/auth.middleware.js";
import asyncHandlerMiddleware from '../middlewares/asyncHandlerMiddleware.js';


const conversationRoutes = Router();

conversationRoutes.get("/conversation", asyncHandlerMiddleware(getConversations));
conversationRoutes.post("/conversation", requireAuth, createConversation);
conversationRoutes.get("/conversation/:id", requireAuth, getConversationById);


export default conversationRoutes;