import express from 'express';
const router = express.Router();
import multer from 'multer';
import path from 'path'
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



export default router;