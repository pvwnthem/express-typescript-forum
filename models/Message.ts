import mongoose from "mongoose";

const messageschema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
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
    },
    date: {
        type: Date,
        default: Date.now
    }

});



const Message = mongoose.model('Message', messageschema)

export default Message