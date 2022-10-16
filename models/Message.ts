import mongoose from "mongoose";

const messageschema = new mongoose.Schema({
    sentBy: {
        type: String,
        required: true
    },
    sentTo: {
        type: String,
        required: true
    },
    text: {
        type:String,
        required: true
    },
    images: {
        type: [String],
        required: false,
        default: []
    },
    reactions: {
        type: [String],
        required: false,
        default: []
    }

});



const Message = mongoose.model('Message', messageschema)

export default Message