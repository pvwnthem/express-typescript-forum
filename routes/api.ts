import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('api');
})
router.get('/user/:username', (req, res) => {
    console.log(req.params.username);
    res.send(req.params.username);
})
export default router;