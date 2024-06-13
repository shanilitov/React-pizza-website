const express = require('express');
const router = express.Router();
const queries = require('../queries/orders')

// get the order details, by order id
router.get('/get_order_data/:order_id', (req, res) => {
    try {
        console.log('in get order data by order id router')
        console.log(req.params)
        queries.getOrderDataByOrderId(req.params.order_id, (ans) => {
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

// create new order
router.post('/create_new_order', async (req, res) => {
    console.log(`in post create new order.`)
    try {

        const order = req.body;
        console.log({ order });

        // דבר ראשון נוסיף את ההזמנה לטבלת ההזמנות 
        await queries.createneworder(order.city, order.street, order.number, order.order_date, order.comment, order.price, order.name, order.phone, order.addings,  (orderResponse) => {
            console.log(`res1 is ${orderResponse}`)
            console.log(`####: ${orderResponse}`)
            const orderInsertId = JSON.parse(orderResponse).insertId;
            console.log(`%%%%: ${orderResponse}`)
            // כעת שיש לנו מזהה להזמנה, נוסיף את ההזמנה לסניף בדאטה בייס
            queries.insertintobranchorders(order.branch_id, orderInsertId, branchOrderResponse => {
                if (!branchOrderResponse) {
                    return res.send(false);
                }
                // עבור כל פריט ופריט נוסיף אותו
                for (const detail of order.orderdetails) {
                    console.log({ detail })
                    //const product = JSON.parse( JSON.stringify(detail.product));
                    //console.log({ product })
                    const quantity = detail.quantity;

                    queries.insertintoorderdetailes(orderInsertId, detail.key, quantity, detail.product.price, (orderDetailsResponse) => {
                        if (!orderDetailsResponse) {
                            return res.send(false);
                        }
                    })
                }

            })
            // אם ההזמנה היא טיקאווי נוסיף אותה לטבלת האיסוף העצמי
            console.log(`order is takeayaw? ${order.takeAway}`)
            if (order.takeAway) {
                console.log('Add to takaway')
                queries.takeaway(orderInsertId, (takeawayRes) => {
                    if (!takeawayRes) {
                        return res.send(false)
                    }
                })
            }
            // אם הגענו עד פה בלי ליפול, סימן שההזמנה נכנסה למערכת בהצלחה ונחזיר אמת ללקוח
            res.send(true);
        })
    } catch (error) {
        console.error(error);
        res.send(false);
    }
});

// get the products, ids and names by the order id
router.get('/get_product_id_and_price_by_order_id/:order_id', (req, res) => {
    try {
        console.log(req.params)
        queries.getproductandpricebyorderid(req.params.order_id, (ans) => {
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

// get the adding for a specipic order
router.get('get_adding_by_order_id/:id', (req, res) => {
    try {
        console.log(req.params.id)
        queries.getaddingnbyorderid(req.params.id, (ans) => {
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

// get the adding mane by it's id
router.get('/gettadingnamebyid/:id', (req, res) => {
    try {
        console.log(req.params.id)
        queries.getaddingnbyorderid(req.params.id, (ans) => {
            console.log(ans)
            if (ans) {
                res.json(ans)
            }
            else {
                res.send(ans)
            }
        })
    }
    catch {
        console.log('error!')
        res.send(false)
    }

})

// get the product name by it's id
router.get('/getproductsnamebyid/:id', (req, res) => {
    try {
        console.log(req.params.id)
        queries.getproductsnbyorderid(req.params.id, (ans) => {
            console.log(ans)
            if (ans) {
                res.json(ans)
            }
            else {
                res.send(ans)
            }
        })
    }
    catch {
        console.log('error!')
        res.send(false)
    }

})

// change order status to sent, by it's id
router.get('/changesendbyorderid/:id/:status', (req, res) => {
    try {
        console.log(req.params.id)
        queries.changesendbyorderid(req.params.id, req.params.status, (ans) => {
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

// get order by the client phone
router.post('/getOrderByPhone', (req, res) => {
    try {
        console.log('in get order by phone, phone is:' + req.body.phone)

        queries.getOrderByPhone(req.body.phone, (order) => {
            console.log('order: ' + order)
            if (order) {
                return res.json(order);
            } else {
                res.status(500).json({ error: 'Error fetching order' });
            }
        });


    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Error fetching order' });
    }
})


// השאילתה שמצרפת את כל הטבלאות כדי להחזיר פירוט של הזמנה מסוימת כולל המוצרים שלה בצורת רשימה והאם היא איסוף עצמי.
router.get('/get_full_order/:id', (req, res) => {
    console.log(`\nin get ful order: ${req.params.id}`)
    // מחזיר את הפרטים המלאים של ההזמנה.
    // יראה ככה: 
    // [order_id, adress, order_date, status, client_name, products_list[{item_in_order_id, product_name, product_price, status}, {...}, ...], total_price, is_takeaway]
    queries.get_full_order(req.params.id, (order) => {
        console.log('@@@')
        console.log(order)
        if (order) {
            res.json(order)
        }
        else {
            res.json(false)
        }
    })
})

router.get('/get_status/:orderId', (req, res) => {
    try {
        console.log(`\nin get order status: ${req.params}`)
        queries.get_order_status(req.params.orderId, (statusData) => {
            console.log(statusData)
            if (statusData) {
                const data = JSON.parse(statusData)[0]
                console.log(`\n${data}`)
                let sum = 0
                sum += data.client_accepted
                sum += data.branch_status
                sum += data.delivery_status === null ? 0 : data.delivery_status

                res.json(sum)
            }
            else {
                res.json(false)
            }

        })
    }
    catch (err) {

    }

})

router.get('/get_ready_products_list/:orderId', (req, res) => {
    console.log(`\nin get productlist: ${req.params.orderId}`)
    queries.get_ready_products_list(req.params.orderId, (products) => {
        console.log(`\nproducts: ${products}`)
        if (products)
            res.json(products)
        else
            res.json(false)
    })

})

router.get('/change_product_in_order_status/:orderId/:productId', (req, res) => {
    console.log('update ststus to product')
    queries.setProductStatus(req.params.orderId, req.params.productId, (ans) => {
        if (ans)
            res.json('Success')
        else
            res.json(false)
    })
})

module.exports = router