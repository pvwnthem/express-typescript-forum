import local from 'passport-local'
const LocalStrategy = local.Strategy;
import bcrypt from 'bcrypt';
// Load User model
import User from '../models/User'

module.exports = function(passport: any) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user: any, done: any) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id: any, done: any) {
    User.findById(id, function(err: any, user: any) {
      done(err, user);
    });
  });
};