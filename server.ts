import express from 'express';
import passport from 'passport';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import index from './routes/index';
import auth from './routes/auth';
import api from './routes/api';
import flash from 'connect-flash';
import ejs from 'ejs'
import * as bodyParser from 'body-parser';
import session from 'express-session';
import local from 'passport-local'
const LocalStrategy = local.Strategy;
//import { createServer } from "http";
//import { Server } from "socket.io";
import bcrypt from 'bcrypt';
// Load User model
import User from './models/User'
//const httpServer = createServer((req, res) => {
  //if (req.url !== "/") {
    //res.writeHead(404);
    //res.end("Not found");
    //return;
//}})
const app = express();

//const io = new Server(httpServer, {
  // Socket.IO options
//});

//io.on("connection", (socket) => {
  //console.log(`connect ${socket.id}`);
  //socket.on("message", (message) => {
    //console.log(message)
  //})
  //socket.on("disconnect", (reason) => {
    //console.log(`disconnect ${socket.id} due to ${reason}`);
  //});
//});

//httpServer.listen(3000, function() {
  //console.log(" ws listening on 3000");
//});

app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(session({
  secret: 'yoursecret',
  resave: false,
  saveUninitialized: false,

  }
  )
  )
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
app.use(passport.initialize());
app.use(passport.session())
  
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

const port = 8080;

app.use('/', index);
app.use('/auth', auth);
app.use('/api', api);

app.listen(port, () => {
    console.log('listening on port ' + port);
}   );