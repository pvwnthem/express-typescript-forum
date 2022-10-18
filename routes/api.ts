import express from 'express';
import Message from '../models/Message'
const router = express.Router();
import Post from '../models/Post'
import multer from 'multer';
import path from 'path'
//import { io } from 'socket.io-client'

//const socket= io("ws://localhost:3000/")
//socket.on("connect", function() {
    //console.log(`event: connect | session id: ${socket.id}`)
//})
//socket.on("connect_error", (err) => {
    //console.log(`event: connect_error | reason: ${err.message}`);
  //});

  //socket.on("disconnect", (reason) => {
    //console.log(`event: disconnect | reason: ${reason}`);
  //});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, new Date().toISOString().replace(/:/g, '-') +'-'+ file.originalname);
    }
}) 

const upload = multer({storage: storage})

router.get('/upload', (req, res) => {
    res.render('upload')


})
router.post('/upload', upload.single('image'), (req, res) => {
    res.send(200)


})

router.post('/newPost', (req, res) => {
    const authorId = req.body.uid
    const text = req.body.text

    const newpost = new Post({
        authorId: authorId,
        text: text
    }).save()
})


export default router;