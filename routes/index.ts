import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('index')
})
router.get('/login', (req, res) => {
    res.redirect('/auth/login')
})
router.get('/user/:username', (req, res) => {
    console.log(req.params.username);
    res.send(req.params.username);
})

export default router;