import mongoose from "mongoose"; 







const UserSchema = new mongoose.Schema({
    authorId: {
        type: String,
        required: true
      },
      
      comments: {
        type: [
          {
            commenterId: String,
            text: String,
            timestamp: Number
          }
        ],
        required: false
      },
      likers: {
        type: [String],
        required: false
      },
      likesCount: {
        type: Number,
        required: false
      },
      text: {
        type: String,
        trim: true,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    
  });
  
  const Post = mongoose.model('Post', UserSchema);
  
  export default Post