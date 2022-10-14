import express from 'express';
const router = express.Router();
import User from '../models/User'
import dburl from '../config/keys'

const db: string = dburl.dburl

import mongoose from 'mongoose';
mongoose.connect(db).then(() => {
    console.log('mongodb connection established');
  }).catch(err => {
    console.log(err);
  });

router.get('/', (req, res) => {
    res.send('index')
})
router.get('/login', (req, res) => {
    res.redirect('/auth/login')
})
router.get('/user/:username', (req, res) => {
    console.log(req.params.username);
    res.send(req.params.username);
    const username: string = req.params.username;
    User.findOne({ username: username }, (err: any, user: any) => {
        if (user.private) {
            res.render('user', { username: user.name, avatar: user.avatar, private: true })
        } else {
            if(!user.isEmailShown) {
                res.render('user', {username: user.name, email: 'this users email is private', bio: user.bio, followers: user.follwers, following: user.following, private: false })
            } else {
                res.render('user', { username: user.name, email: user.email, followers: user.follwers, bio: user.bio, following: user.following, private: false })
            }
            
        }



        
        
    })
})

export default router;