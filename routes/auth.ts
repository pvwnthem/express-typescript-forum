import express from 'express';
import passport from 'passport';
const router = express.Router();

router.get('/login', (req: any, res: any) => {
    res.render('login')
})
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: '/auth/login',
      failureFlash: true
    })(req, res, next);
  });

export default router;