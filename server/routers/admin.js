const express = require('express');
const router = express.Router();
const oredrQueries = require('../queries/admin')


router.get('/get_branch_money/:id', (req, res) => {
    try {
        console.log(req.params.id)
        oredrQueries.getordermoney(req.params.id, (ans) => {
            console.log(ans)
            if (ans) {
                let sum = JSON.parse(ans)[0].sum
                console.log(`sun is ${sum} $`)
                if(sum !== null)
                    res.json(sum)
                else
                    res.json(0)
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