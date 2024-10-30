import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({

    asked_conversation_data: { //could be text or voice
        type: String,
        required: true,
    },
    response_conversation_transcript: String,
    
    response_text: {
        type: String,
    },

    is_deleted: {
        type: Boolean,
        default: false
    },

    is_active: {
        type: Boolean,
        default: true
    },
    account_ref: {
        type: mongoose.Types.ObjectId,
        ref: 'account',
        default: null
    }

}, { timestamps: true });

export default mongoose.model("conversation", conversationSchema);