
const express = require('express');
const router = express.Router();
const queries = require('./queries')


router.post('/', async (req, res) => {
    try {
        console.log(req.body)

        queries.signin(req.body.name, req.body.password, req.body.branch, (ans) => {
            console.log(ans)
            if (ans) {
                res.json(ans)
            }
            else {
                res.send(false)
            }
        })
    }
    catch {
        console.log('error!')
        res.send(false)
    }

})

router.get('/get_user_is/:name', (req, res) => {
    try {
        console.log(req.params.name)
        queries.getuseridbyname(req.params.name, (ans) => {
            console.log(ans)
            if (ans) {
                res.json(true)
            }
            else {
                res.send(false)
            }
        })
    }
    catch {
        console.log('error!')
        res.send(false)
    }
})

router.post('/Delivery', async (req, res) => {
    try {
        console.log(`the body: ${req.body}`)

        queries.signinDelivery(req.body.id, req.body.name, req.body.phone, (ans) => {
            console.log(ans)
            if (ans) {
                res.json(ans)
            }
            else {
                res.send(false)
            }
        })
    }
    catch {
        console.log('error!')
        res.send(false)
    }

})

module.exports = router