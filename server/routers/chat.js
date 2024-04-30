const express = require('express');
const router = express.Router();
const queries = require('./queries')

router.get('/get/:orderId/:connection', async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const connection = req.params.connection;

        queries.getChat(orderId, connection, (chat) => {
            console.log('chat: ' + chat)
            if (chat) {
                return res.json(chat);
            } else {
                res.status(500).json({ error: 'Error fetching chat messages' });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error fetching chat messages' });
    }
});




router.post('/send', async (req, res) => {
    try {
        const message = req.body.message
        const orderId = req.body.orderId
        const connection = req.body.connection

        queries.sendMessage(message, orderId, connection, (ans) => {
            if (ans) {
                res.send(true);
            }
            else {
                res.send(false)
            }
        });
    }
    catch (err) {
        console.log('err: ' + err)
        res.send(false)
    }

})

module.exports = router