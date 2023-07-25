const express = require('express');
const router = express.Router();
const queries = require('./queries')

router.get('/get_order_data/:order_id', (req, res) => {
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
})

router.post('/create_new_order', (req, res) => {
    const order = req.body
    console.log({order});
    
    queries.createneworder(order.city, order.street, order.number, order.order_date, order.comment,
        order.price, order.name, (ans) => {
            console.log('ans is:' + ans)
            if (ans) {
                let { insertId } = JSON.parse(ans)

                queries.insertintobranchorders( order.branch_id, insertId, async (ans) => {
                    console.log(ans)
                    if (ans) {
                        for (let detail of order.orderdetails) {
                         await   queries.insertintoorderdetailes(insertId, detail.id, detail.price, (ans) => {
                                console.log(ans)
                            })
                        }
                        res.send(true)
                    }

                })
            }
            else {
                res.send(false)
            }
        })
})


router.get('/get_product_id_and_price_by_order_id/:order_id', (req, res)=>{
    console.log(req.params)
    queries.getproductandpricebyorderid(req.params.order_id, (ans)=>{
        console.log(ans)
        if (ans) {
            res.json(ans)
        }
        else{
            res.send(false)
        }
    })
})

router.get('get_adding_by_order_id/:id', (req, res)=>{
    console.log(req.params.id)
    queries.getaddingnbyorderid(req.params.id, (ans)=>{
        console.log(ans)
        if (ans) {
            res.json(ans)
        }
        else{
            res.send(false)
        }
    })
})

router.get('/gettadingnamebyid/:id',(req, res)=>{
    console.log(req.params.id)
    queries.getaddingnbyorderid(req.params.id, (ans)=>{
        console.log(ans)
        if (ans) {
            res.json(ans)
        }
        else{
            res.send(ans)
        }
    })

})

router.get('/getproductsnamebyid/:id',(req, res)=>{
    console.log(req.params.id)
    queries.getproductsnbyorderid(req.params.id, (ans)=>{
        console.log(ans)
        if (ans) {
            res.json(ans)
        }
        else{
            res.send(ans)
        }
    })

})
 
router.get('/changesendbyorderid/:id', (req, res)=>{
    console.log(req.params.id)
    queries.changesendbyorderid(req.params.id, (ans)=>{
        console.log(ans)
        if (ans) {
            res.json(ans)
        }
        else{
            res.send()
        }
    })
})


module.exports = router