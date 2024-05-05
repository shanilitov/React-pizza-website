const express = require('express');
const router = express.Router();
const queries = require('../queries/delivery')

//הרשמה לשליח
router.post('/signin', async (req, res) => {
    try {
        console.log(`the body: ${req.body}`)

        queries.signinDelivery(req.body.id, req.body.name, req.body.phone, (ans) => {
            console.log(ans)
            if (ans) {
                res.json(ans)
            }
            else {
                res.status(500).json({ error: 'Coudent signin this new delivery' });
            }
        })
    }
    catch {
        console.log('error!')
        res.send(false)
    }

})

// לקבל את ההזמנה הנוכחית של השליח אם יש לו כזות אם לא יחזור false
router.get('/getCurrentOrder/:deliverId', (req, res) => {
    try {
        const deliverId = req.params.deliverId
        console.log(`in get current order, the deliver id is: ${deliverId}`)

        queries.getCurrentOrder(deliverId, (ans) => {
            console.log(`in get current order callback function: ans is ${ans}`)
            // ans = [{orderId, status, city, street, number}] or false.
            if (ans)
                res.json(ans)
            else
                res.json(false)
        })

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Error fetching order' });
    }
})


router.post('/login', async (req, res) => {
    try {
        console.log(req.body)

        queries.loginDelivery(req.body.name, req.body.id, (user => {
            console.log('answer: ' + user)
            if (user) {
                // const dataBack = { 'user': user[0].id, 'admin': user[0].adamin, 'userData': { 'branchId': user[0].branch_id, 'userName': user[0].user_name } }
                res.json(user)
            }
            else {
                res.send(false)
            }
        }))
    }
    catch (err) {
        console.log('error!:' + err)
        res.send(false)
    }

})




module.exports = router