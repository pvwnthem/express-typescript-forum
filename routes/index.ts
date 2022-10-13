import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('index')
})
router.get('/login', (req, res) => {
    res.redirect('/auth/login')
})


export default router;