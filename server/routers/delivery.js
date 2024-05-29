const express = require('express');
const router = express.Router();
const queries = require('../queries/delivery')

//הרשמה לשליח
router.post('/signin', async (req, res) => {
    try {
        console.log(`the body: ${req.body}`)

        queries.signinDelivery(req.body.id, req.body.name, req.body.phone, req.body.branch, req.body.email, (ans) => {
            console.log(ans)
            if (ans) {
                res.status(200).json(true)
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
            // ans = [{orderId, status, city, street, number}] or [].

            if (ans !== false && JSON.parse(ans)[0] !== undefined) {
                console.log(JSON.parse(ans)[0])
                res.json(JSON.parse(ans)[0])
            }
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

router.get('/getNewOrder/:deliverId', async (req, res) => {
    try {
        const deliverId = req.params.deliverId
        console.log(`in get new order, the deliver id is: ${deliverId}`)
        // בדיקת תקינות: לוודא שאין לשליח הזמנה שלא נגמרה.
        queries.getCurrentOrder(deliverId, async (ans) => {
            console.log(`in get current order callback function: ans is ${ans}`)
            if (ans !== false && JSON.parse(ans).length == 0) {
                // 1. למצוא את הסניף של השליח
                queries.getDeliverBranch(deliverId, async (branchId) => {
                    console.log(`deliver branch is ${branchId}`)
                    if (branchId) {
                        // 2. לבקש את ההזמנה שממתינה למשלוח הכי הרבה זמן
                        queries.getOrederWaiting(JSON.parse(branchId)[0].branch, async(order)=>{
                            console.log(`Order to take is ${order}`)
                            let o = JSON.parse(order)[0]
                            console.log(o)
                            console.log(o.id)
                             // 3. להוסיף לשליח את ההזמנה
                             queries.addNewDeliveryToDeliver(deliverId, o.id, (ans)=>{
                                console.log(`ans after inserting the deliver to the delivery is: ${ans}`)
                                if(ans){
                                    res.json(o)
                                }
                                else{
                                    res.json(false)
                                }
                             })

                            
                        })
                    }
                })

            }
            else{
                res.status(200).json({error: 'You already have an order'})
            }

        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Error fetching order' });
    }
})


router.get(`/getOredrStatus/:orderId`, (req, res)=>{
    console.log('in get order status router')
    queries.getStatus(req.params.orderId, (ans)=>{
        console.log(`status back is: ${ans}`)
        if(ans){
            console.log(`res will be ${JSON.parse(ans)[0].status}`)
            res.status(200).json(JSON.parse(ans)[0].status)
        }
        else{
            console.log(`res will be ${false}`)
            res.status(200).json(false)
        }
    })
})



module.exports = router