const express = require('express');
const router = express.Router();
const oredrQueries = require('../queries/admin')


router.get('/get_branch_money/:id', (req, res) => {
    try {
        console.log(req.params.id)
        oredrQueries.getordermoney(req.params.id, (ans) => {
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