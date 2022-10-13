import mongoose from "mongoose"; 

import uuid from "uuid";



function getuuid() {
  return uuid.v4()
}

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    uid: {
      type: String,
      default: getuuid()
    }
    
  });
  
  const User = mongoose.model('User', UserSchema);
  
  export default User