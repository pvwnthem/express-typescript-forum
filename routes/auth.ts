import express from 'express';
import passport from 'passport';
import auth from '../config/auth'
const router = express.Router();
import dburl from '../config/keys'
import User from '../models/User'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose';
router.get('/login', auth.forwardAuthenticated, (req: any, res: any) => {
    res.render('login')
})
router.post('/login', (req, res, next) => {

    passport.authenticate('local', {
      successRedirect: '/api/user/1234',
      failureRedirect: '/auth/login',
      failureFlash: true
    })(req, res, next);
  });

const db: string = dburl.dburl

mongoose.connect(db).then(() => {
      console.log('mongodb connection established');
    }).catch(err => {
      console.log(err);
    });
router.get('/register', auth.forwardAuthenticated, (req: any, res: any) => {
    res.render('register')
})
router.post('/register', (req, res, next) => {
    const {email, name, password, password2} = req.body;
    let errors: Array<Object> = []
    if(!email || !name || !password || !password2) {
      errors.push({msg: 'Please enter all fields'})

    }
    if (password != password2) {
      errors.push({msg: 'Passwords do not match'})
    }
    if (password.length < 8) {
      errors.push({msg: 'Password must be at least 8 characters'})

    }

    if (errors.length > 0) {
      res.render('register', {
        errors,
        email,
        name,
        password,
        password2
      })
    } else {
      User.findOne({email:email}).then(user => {
        if(user) {
          errors.push({msg: 'This email is already in use!'})
          res.render('register', {
            errors,
            email,
            name,
            password,
            password2
          })
        }
        else {
          const newUser = new User({
            email,
            name,
            password
          })
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              newUser.password = hash
              newUser.save()
              .then( user => {
                req.flash('success_msg', 'You are now registered and can login')
                res.redirect('/login')
              })
              .catch( err => {
                console.log(err)
              
              })
            })
          })
        }
      })
    } 
})

router.post('login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
})
 router.get('/logout', async function (req, res, next) {
  req.logout(function(err) {
    if(err) {
      return next(err)
    }
  })
 })

export default router;