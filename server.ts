import express from 'express';
import passport from 'passport';
import path from 'path';
import index from './routes/index';
import auth from './routes/auth';
import api from './routes/api';
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
const port: Number = 8080;

app.use('/', index);
app.use('/auth', auth);
app.use('/api', api);

app.listen(port, () => {
    console.log('listening on port ' + port);
}   );