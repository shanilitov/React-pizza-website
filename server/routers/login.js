// const router = require('express').Router()

const express = require('express');
const router = express.Router();
const queries = require('./queries')

router.post('/', async (req, res) => {
    try {
        console.log(req.body)

        queries.loginByNameAndPass(req.body.name, req.body.password, (user => {
            console.log('answer: ' + user)
            if (user) {
                // const dataBack = { 'user': user[0].id, 'admin': user[0].adamin, 'userData': { 'branchId': user[0].branch_id, 'userName': user[0].user_name } }
                res.json(user)
            }
            else {
                res.send(false)
            }
        }))
    }
    catch {
        console.log('error!')
        res.send(false)
    }

})

module.exports = router