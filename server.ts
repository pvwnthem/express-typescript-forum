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
const app = express();

app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
    }
   
}));
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

const port: Number = 8080;

app.use('/', index);
app.use('/auth', auth);
app.use('/api', api);

app.listen(port, () => {
    console.log('listening on port ' + port);
}   );