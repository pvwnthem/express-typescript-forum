import express from 'express';
const router = express.Router();
import User from '../models/User'
import dburl from '../config/keys'
import ensureAuthenticated from '../config/auth'
const db: string = dburl.dburl
const ensureauth = ensureAuthenticated.ensureAuthenticated
import mongoose from 'mongoose';
import {resolveidtoname, resolvenametoid} from '../utils/resolvepost'
import { error } from 'console';
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
router.get('/register', (req, res) => {
    res.redirect('/auth/register')
})



router.get('/user/:username', ensureauth, (req, res) => {
    console.log(req.params.username);
    req.socket.setTimeout(200)
    if(req.params.username === 'e') {
        console.log('passing')
    } else {

    
    User.findOne({name: req.params.username }, (err: any, user: any) => {
        console.log(user)
        if(user) {
            if (user.private) {
                res.render('user', {user: req.user, private: true })
            } else {
                if(!user.isEmailShown) {
                    res.render('user', {user: req.user, username: user.name, avatar: user.avatar, email: 'this users email is private', bio: user.bio, followers: user.follwers, following: user.following, private: false })
                } else {
                    res.render('user', { user: req.user, username: user.name, email: user.email, avatar: user.avatar, followers: user.follwers, bio: user.bio, following: user.following, private: false })
                }
                
            
            }
        } else {
            
            res.render('404-user' , {user: req.user})
        }
    
        if(err){
            console.log(err)
        } 




        
        
    })
    }
})
router.get('/home', (req, res)  => {
    res.render('home', {user: req.user})
})
export default router;


// dms can all be stored in a db, when user loads dm page with user it renders all messages with the sendto attribute with thier id or username