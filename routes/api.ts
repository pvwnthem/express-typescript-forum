import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('api');
})
router.patch('user/:uid', (req, res) => {
    console.log(req.user)
    res.send(req.user)
})
export default router;