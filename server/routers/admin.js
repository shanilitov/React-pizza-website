const express = require('express');
const router = express.Router();
const queries = require('./queries')

router.get('/get_branch_money/:id', (req, res)=>{
    console.log(req.params.id)
    queries.getordermoney(req.params.id, (ans)=>{
        console.log(ans)
        if (ans) {
            res.json(ans)
        }
        else{
            res.send(false)
        }
    })
})

module.exports = router