const db = require('../dal/DB');

async function getordermoney(id, callback) {
    try {
    console.log('in get order mony function' + id)
    let sql = `
    SELECT sum(orders.price) as sum
    FROM orders.orders as orders 
    JOIN branches.branch_orders as branch_orders
    ON orders.id = branch_orders.order_id
    WHERE branch_orders.branch_id =${id}`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

module.exports = {getordermoney}