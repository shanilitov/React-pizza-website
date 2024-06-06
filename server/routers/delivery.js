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

// התחברות לשליח
router.post('/login', async (req, res) => {
    try {
        console.log(req.body)

        queries.loginDelivery(req.body.name, req.body.id, (user => {
            console.log('answer: ' + user)
            if (user && JSON.parse(user)[0] !== undefined) {
                //const dataBack = { 'user': user[0].id, 'admin': user[0].adamin, 'userData': { 'branchId': user[0].branch_id, 'userName': user[0].user_name } }
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

// שליח שמבקש לקבל הזמנה חדשה
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
                        queries.getOrederWaiting(JSON.parse(branchId)[0].branch, async (order) => {
                            console.log(`Order to take is ${order}`)
                            let o = JSON.parse(order)[0]
                            if (o == undefined) {
                                res.status(200).json(false)
                                return;
                            }
                            console.log(o)
                            console.log(o.id)
                            // 3. להוסיף לשליח את ההזמנה
                            queries.addNewDeliveryToDeliver(deliverId, o.id, (ans) => {
                                console.log(`ans after inserting the deliver to the delivery is: ${ans}`)
                                if (ans) {
                                    res.json(o)
                                }
                                else {
                                    res.json(false)
                                }



                            })




                        })
                    }
                    else
                        res.status(200).json({ error: 'You already have an order' })
                })

            }
            else {
                res.status(200).json({ error: 'You already have an order' })
            }

        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Error fetching order' });
    }
})

// שליח שמבקש את הסטטוס של ההזמנה שהוא אוסף
router.get(`/getOredrStatus/:orderId`, (req, res) => {
    console.log('in get order status router')
    queries.getStatus(req.params.orderId, (ans) => {
        console.log(`status back is: ${ans}`)
        if (ans) {
            console.log(`res will be ${JSON.parse(ans)[0].status}`)
            res.status(200).json(JSON.parse(ans)[0].status)
        }
        else {
            console.log(`res will be ${false}`)
            res.status(200).json(false)
        }
    })
})

// שליח שרוצה לעדכן שהוא אסף את ההזמנה או שהוא מסר אותה כבר לשליח
router.get('/changeDeliveryStatus/:deliveryId/:orderId/:status', async (req, res) => {
    try {
        console.log(`Delivery Guy number ${req.params.deliveryId}, order number ${req.params.orderId} to status: ${req.params.status}`)
        // נכתוב מראש את הפונקציה שתשלח חזרה למשתמש אם הפעולה הצליחה, ונשתמש בה כשנרצה להחזיר תשובה בהמשך...
        const callback = async (ans) => {
            console.log(ans)
            if (ans)
                res.status(200).json(true)
            else
                res.status(500).json(false)
        }

        // בדיקת תקינות:
        // אם השליח רוצה לעדכן שהוא אוסף מהסניף, נצטרך לוודא שההזמנה כבר מוכנה בסניף- כלומר שהסטטוס שלה בסניף הוא 1
        if (req.params.status == 2) {
            // נפנה לשאילתה שבודקת את הסטטוס בסניף ונבדוק את התשובה שחזרה
            queries.verify_that_status_in_the_shop_is_1(req.params.orderId, (data) => {
                if (data) {
                    console.log(`status in the branch oredr is ${JSON.parse(data)[0]}`)
                    // data = [0/1/2]
                    // רק אם זה מצב 1 נשנה את הססטוס של השלח וההזמנה בסניף
                    if (JSON.parse(data)[0] == 1) {
                        // נשנה את הסטטוס של ההזמנה אצל השליח ל2
                        queries.changeSatus(req.params.orderId, req.params.deliveryId, req.params.status, (ans) => {
                            console.log(ans)
                            // נעדכן את הסטטוס בחנות
                            if (ans) {
                                queries.update_delivery_in_shop(req.params.orderId, callback) // נשלח את הפונקציה שכתבנו ששולחת בחזרה ללקוח אמת אם הכל עבד תקין
                            } else
                                res.status(500).json('delivery is not ready yet')
                        })
                    } else
                        res.status(500).json('delivery is not ready yet')
                }
                else
                    res.status(500).json(`Couln't find current status`)

            })

        }
        else { // אם השליח רוצה לעדכן את הסטטוס לכך שהוא מסר לשליח, נפנה אותו ישר לפונקציה שמעדכנת סטטוס
            queries.changeSatus(req.params.orderId, req.params.deliveryId, req.params.status, (ans) => {
                if (ans) {
                    console.log('change the status in orders to 1')
                    // נעדכן גם את הסטטוס הכללי של ההזמנה
                    queries.update_delivery_in_order(req.params.orderId, callback) // נשתמש בפונקציה שכתבנו בשלביל להחזיר למשתמש תשובה תקינה אם הכל הולך טוב
                }
                else
                    callback(false)

            })
        }
    }
    catch (err) {
        console.log('err!')
        res.status(500).json(false)
    }



})

router.get('/changeToRecivedTakeAwayOrders/:orderId', async (req, res) => {
    console.log(`change status in case of take away, order number ${req.params.orderId}`)
    // נבדוק שההזמנה היא באמת takeAway ושהיא מוכנה, כלומר שהסטטוס שלה בסניף היא 1
    queries.verify_that_status_in_the_shop_is_1(req.params.orderId, (data) => {
        if (!data || !(JSON.parse(data)[0] == 1)) {
            res.status(500).json('Oreder is not ready yet!')
            return
        }
    })

    // נכתוב מראש את הפונקציה שתשלח חזרה למשתמש אם הפעולה הצליחה, ונשתמש בה כשנרצה להחזיר תשובה בהמשך...
    const callback = async (ans) => {
        console.log(ans)
        if (ans)
            res.status(200).json(true)
        else
            res.status(500).json(false)
    }

    // אם הכל תקין, נשנה את הסטטוס בחנות ואת הסטטוס של ההזמנה
    queries.update_delivery_in_shop(req.params.orderId, (ans) => {
        if (ans) {
            console.log('change the status in orders to 1')
            // נעדכן גם את הסטטוס הכללי של ההזמנה
            queries.update_delivery_in_order(req.params.orderId, c)
        }
        else
            callback(false)

    })
})


module.exports = router