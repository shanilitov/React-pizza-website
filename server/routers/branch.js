
const express = require('express');
const router = express.Router();
const queries = require('./queries')



router.get('/getBranchData/:branchid', (req, res) => {
    try {
        console.log(req.params)
        let id = req.params.branchid
        id = parseInt(id)
        console.log(id + 'out')


        console.log('in get branch by id')
        queries.getBranchById(id, (branch => {
            console.log(branch)
            if (branch) {
                res.json(branch)
            }
            else {
                res.send(false)
            }
        })
        )
    }
    catch {
        console.log('error!')
        res.send(false)
    }

})

router.get('/info', (req, res) => {

    try {
        queries.getAllBranches((ans => {
            console.log(ans)
            if (ans) {
                res.json(ans)
            }
            else {
                console.log('fail')
                res.send(false)
            }
        }))
    }
    catch {
        console.log('error!')
        res.send(false)
    }
})

router.get(`/get_all_orders/:branchid`, (req, res) => {
    try {
        console.log(req.params)
        let id = req.params.branchid
        id = parseInt(id)
        console.log('in get all orders by branch id ' + id)

        queries.getOrdersByBranchId(id, (ans) => {
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

router.get('/get_all_branches_data', (req, res) => {
    try {
        console.log('in get all branches data router')
        queries.getallbranchesdata((ans) => {
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