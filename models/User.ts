import mongoose from "mongoose"; 

import { v4 as uuidv4 } from 'uuid';



function getuuid() : String {
  return uuidv4();

}


const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    },
    bio: {
      type: String
    },
    avatar: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: true
    },
    followers: {
      type: [String]
    },
    following: {
      type: [String]
    },
    date: {
      type: Date,
      default: Date.now
    },
    uid: {
      type: String,
      default: getuuid()
    },
    isEmailShown: {
      type: Boolean,
      default: false
    },
    private: {
      type: Boolean,
      default: false
    }, 
    banner: {
      type: String,
      default: ''
    },
    verified: {
      type: Boolean,
      default: false
    },
    
    
  });
  
  const User = mongoose.model('User', UserSchema);
  
  export default User