import mongoose from 'mongoose';
import validator from 'validator';


const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: (val) => {
                if(!val) throw new Error("email is required");

                if(!validator.isEmail(val)) throw new Error("invalid email address");

                return true;
            }
        }
    },
    provider_id: {
        type: String,
        required: true
    },
    display_name: String,
    profile_img: String,
    provider_name: {
        type: String,
        required: true
    },
    is_deleted: {
        type: Boolean,
        required: false
    },
    is_locked: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export default mongoose.model("account", accountSchema);