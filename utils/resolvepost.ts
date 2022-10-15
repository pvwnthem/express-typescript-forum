// resolve the id from a name and a name from an id


import Post from '../models/Post'
import User from '../models/User'
import dburl from '../config/keys'
import ensureAuthenticated from '../config/auth'
const db: string = dburl.dburl
const ensureauth = ensureAuthenticated.ensureAuthenticated
import mongoose from 'mongoose';
mongoose.connect(db).then(() => {
    console.log('mongodb connection established');
  }).catch(err => {
    console.log(err);
  });

function resolvenametoid(name: string) {
    if (name.length === 0) {
        return 'No name specified';
    }
    User.findOne({name: name}).then(user => {
        if (user) {
            return user.id;
        } else {
            return null;
        }
    })


}


function resolveidtoname(uid: string) {
    if (uid.length === 0) {
        return 'No id specified';
    }
    User.findOne({uid: uid}).then(user => {
        if (user) {
            return user.name;
        } else {
            return null;
        }
    })


}

export {resolveidtoname, resolvenametoid}
