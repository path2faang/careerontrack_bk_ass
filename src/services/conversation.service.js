import conversationModel from '../models/conversation.model.js';


export const createConversation = async (req, res, _next) => {
    const {
        ask_vn,
    } = req.body;

    const account_ref = req?.user?.id;

    // response_conversation_transcript return & update

    // response_audio_url

    // asked_conversation_audio_url
}

export const getConversations = async (req, res, _next) => {
    const page = req?.query?.page; 
    const limit = req.query?.limit;

    const skip = (page - 1) * limit;
    const fetchConversations = await conversationModel.find({
        account_ref: req.user?.id,
    }).limit(limit).skip(skip);

    if(fetchConversations || !fetchConversations) return res.status(fetchConversations.length > 0 ? 200 : 404).json({
        success: fetchConversations.length > 0 ? true : false,
        message: fetchConversations.length > 0 ? "conversation fetched successfully": "no conversation yet",
        data: fetchConversations.length > 0 ? fetchConversations : []
    })
}

export const getConversationById = async (req, res, _next) => {

    const _id = req?.params?.id;

    if(!_id) throw new Error("conversation id is required");

    const fetchAccountConversation = await conversationModel.findOne({
        account_ref: req.user.id,
        is_deleted: false,
        _id,
    });

    if(!fetchAccountConversation) return res.status(404).json({
        success: false,
        message: "conversation not found",
        data: null
    })

    return res.status(200).json({
        success: false,
        message: "conversation successfully fetched",
        data: fetchAccountConversation
    })
}