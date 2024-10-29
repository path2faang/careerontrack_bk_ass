import {
    createConversation as createConversationService,
    getConversationById as getConversationByIdService,
    getConversations as getConversationsService
} from '../services/conversation.service.js';


export const createConversation = async (req, res, _next) => {
    return await createConversationService(req, res, _next)
}

export const getConversations = async (req, res, _next) => {
    return await getConversationsService(req, res, _next)

}

export const getConversationById = async (req, res, _next) => {
    return await getConversationByIdService(req, res, _next)
}