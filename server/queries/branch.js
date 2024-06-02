const db = require('../dal/DB');

async function getAllBranches(callback) {
    try {
        let sql = `select id, name 
        from branches.branch`

        db.query(sql, callback)
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function getBranchById(branchId, callback) {
    try {
        let id = JSON.stringify(branchId)
        console.log(id + 'in')
        id = parseInt(id)

        console.log('in get branch by id query function')
        let sql = `select * from branches.branch where id=${id}`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}


async function getOrdersByBranchId(branchId, callback) {
    try {
        console.log('in get order by branch id function')
        let sql = `
        SELECT b.order_id, b.status, t.orderId as IstakeAway
        FROM branches.branch_orders b
        Left join orders.takeaway t on b.order_id = t.orderId
        WHERE b.branch_id = ${branchId} and b.status=1`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function getOrderDataByOrderId(order_id, callback) {
    try {
        console.log('in get order data by id function')
        console.log(order_id)
        let sql = `select * from orders.orders where id=${order_id}`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function getallbranchesdata(callback) {
    try {
        console.log('in get all branches data function')
        let sql = `select * from branches.branch`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}


module.exports = { getallbranchesdata, getOrderDataByOrderId, getAllBranches, getBranchById, getOrdersByBranchId }