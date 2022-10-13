import express from 'express';
import passport from 'passport';
import path from 'path';
import index from './routes/index';
import auth from './routes/auth';
import api from './routes/api';
import ejs from 'ejs'
const app = express();

app.use(express.static(path.join(__dirname, 'views')));



const port: Number = 8080;

app.use('/', index);
app.use('/auth', auth);
app.use('/api', api);

app.listen(port, () => {
    console.log('listening on port ' + port);
}   );