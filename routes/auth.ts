import express from 'express';
import passport from 'passport';
import auth from '../config/auth'
const router = express.Router();

router.get('/login', auth.forwardAuthenticated, (req: any, res: any) => {
    res.render('login')
})
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: '/auth/login',
      failureFlash: true
    })(req, res, next);
  });


router.get('/register', auth.forwardAuthenticated, (req: any, res: any) => {
    res.render('login')
})

export default router;