const express = require('express');
const router = express.Router();
const queries = require('./queries')

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


        await queries.createneworder(order.city, order.street, order.number, order.order_date, order.comment, order.price, order.name, order.phone, orderResponse => {
            console.log(`res1 is ${orderResponse}`)
            console.log(`####: ${orderResponse}`)
            const orderInsertId = JSON.parse(orderResponse).insertId;

            console.log(`%%%%: ${orderResponse}`)
            queries.insertintobranchorders(order.branch_id, orderInsertId, branchOrderResponse => {
                if (!branchOrderResponse) {
                    return res.send(false);
                }

                for (const detail of order.orderdetails) {
                    console.log({ detail })
                    //const product = JSON.parse( JSON.stringify(detail.product));
                    //console.log({ product })
                    const quantity = detail.quantity;

                    queries.insertintoorderdetailes(orderInsertId, detail.key, quantity, detail.product.price, orderDetailsResponse => {
                        if (!orderDetailsResponse) {
                            return res.send(false);
                        }
                    })
                }
            })

            res.send(true);
        })
    } catch (error) {
        console.error(error);
        res.send(false);
    }
});



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

router.get('/changesendbyorderid/:id', (req, res) => {
    try {
        console.log(req.params.id)
        queries.changesendbyorderid(req.params.id, (ans) => {
            console.log(ans)
            if (ans) {
                res.json(ans)
            }
            else {
                res.send()
            }
        })
    }
    catch {
        console.log('error!')
        res.send(false)
    }
})

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


module.exports = router