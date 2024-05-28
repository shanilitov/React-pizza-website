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

router.get('/get_full_order/:id', (req, res) => {
    console.log(`\nin get ful order: ${req.params}`)
    // מחזיר את הפרטים המלאים של ההזמנה.
    // יראה ככה: 
    // [order_id, adress, order_date, status, client_name, products_list[{item_in_order_id, product_name, product_price, status}, {...}, ...], total_price, worker_id, is_takeaway, deliver_id]
    queries.get_full_order(req.params.id, (order)=>{
        console.log(order)
        if(order){
            res.json(order)
        }
        else{
            res.json(false)
        }
    })
})
module.exports = router