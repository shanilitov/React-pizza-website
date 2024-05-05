const db = require('../dal/DB');

async function getAllBranches(callback) {
    let sql = `select id, name from branch`
    try {
        db.query(sql, callback)
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function getBranchById(branchId, callback) {
    let id = JSON.stringify(branchId)
    console.log(id + 'in')
    id = parseInt(id)

    console.log('in get branch by id query function')
    let sql = `select * from branch where id=${id}`
    try {
        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}


async function getOrdersByBranchId(branchId, callback) {

    console.log('in get order by branch id function')
    let sql = `SELECT order_id FROM branch_orders WHERE branch_id = ${branchId} and send=false`
    try {
        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function getOrderDataByOrderId(order_id, callback) {
    console.log('in get order data by id function')
    console.log(order_id)
    let sql = `select * from orders where id=${order_id}`
    try {
        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function getallbranchesdata(callback) {
    console.log('in get all branches data function')
    let sql = `select * from branch`
    try {
        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}


module.exports = {getallbranchesdata, getOrderDataByOrderId, getAllBranches, getBranchById, getOrdersByBranchId}