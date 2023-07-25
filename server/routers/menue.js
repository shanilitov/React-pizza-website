const express = require('express');
const router = express.Router();
const queries = require('./queries')

router.get('/getAllProduct', ((req, res) => {

    queries.getAllProduct((products) => {

        console.log(products)
        if (products) {
            res.json(products)
        }
        else {
            res.send(false)
        }

    })
}))

router.get('/get_all_adding', ((req,res)=>{
    queries.getalladdings((ans)=>{
        console.log(ans)
        if (ans) {
            res.json(ans)            
        }
        else{
            res.send(false)
        }
    })
}))

router.get('/get_pizza_item', (req, res)=>{
    queries.getpizzaitem((ans)=>{
        console.log(ans)
        if (ans) {
            res.json(ans)            
        }
        else{
            res.send(false)
        }
    })
})



router.get('/addproduct/:name/:price/:enable', (req, res)=>{
    console.log(req.params)
    queries.addNewProduct(req.params.name, req.params.price, req.params.enable, (ans)=>{
        console.log(res)
        if (res) {
            res.json(true)
        }
        else{
            res.send(false)
        }
    })
})
router.get('/delete/:id', (req,res)=>{
    console.log(req.params.id)
    queries.deleteProduct(req.params.id, (ans)=>{
        console.log(ans)
        if(res){
            res.json(true)
        }
        else{
            res.send(false)
        }
    })
})

router.get('/updateproduct/:id/:name/:price/:enable', (req, res)=>{
    console.log(req.params)
    queries.updateProduct(req.params.id, req.params.name, req.params.price, req.params.enable, (ans)=>{
        console.log(ans)
        if(ans){
            res.json(true)
        }
        else{
            res.send(false)
        }
    })
    
})

module.exports = router