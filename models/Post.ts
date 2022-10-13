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
        required: true
      },
      likers: {
        type: [String],
        required: true
      },
      likesCount: {
        type: Number,
        required: true
      },
      text: {
        type: String,
        trim: true,
        required: true
      },
      timestamp: {
        type: Number,
        required: true
      }
    
  });
  
  const Post = mongoose.model('Post', UserSchema);
  
  export default Post