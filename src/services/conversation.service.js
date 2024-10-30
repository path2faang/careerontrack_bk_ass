import conversationModel from '../models/conversation.model.js';


export const createConversation = async (req, res, _next) => {

    const {
        asked_conversation_data,
    } = req.body;

    const account_ref = req?.user?._id ?? null;

    let response_text = null;
    if (asked_conversation_data.includes("hello")) {
        response_text = "Hello! How can I assist you today?";
    } else if (asked_conversation_data.includes("weather")) {
        response_text = "The weather today is sunny with a high of 25 degrees.";
    } else {
        response_text = "I'm not sure about that. Could you please clarify?";
    }

    const savedResponse = await conversationModel.create({
        account_ref,
        asked_conversation_data,
        response_text,
    })

    if (!savedResponse) return res.status(400).json({
        success: false,
        message: "conversation failed to save",
        data: null
    })
    return res.status(201).json({
        success: true,
        data: {
            ...savedResponse,
            response_text,
        },
        message: "conversation successfully saved"
    })
}

export const getConversations = async (req, res, _next) => {
    const page = req?.query?.page;
    const limit = req.query?.limit;

    const skip = (page - 1) * limit;
    const fetchConversations = await conversationModel.find({
    }).limit(limit).skip(skip);

   return res.status(200).json({
    success: true,
    data: fetchConversations,
    message: "successfully fetched"
   })
}

export const getConversationById = async (req, res, _next) => {

    const _id = req?.params?.id;

    if (!_id) throw new Error("conversation id is required");

    const fetchAccountConversation = await conversationModel.findOne({
        account_ref: req.user.id,
        is_deleted: false,
        _id,
    });

    if (!fetchAccountConversation) return res.status(404).json({
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