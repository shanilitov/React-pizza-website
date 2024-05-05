const db = require('../dal/DB');

async function loginDelivery(name, id, callback) {
    try {
        console.log('name ' + name, 'id ' + id)
        console.log('making sql requset')
        let sql = `select * from delivery.users where name = '${name}' and idusers =${id};`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function signinDelivery(Id, Name, Phone, callback) {
    try {
        console.log('in signin function')
        let sql = `insert into delivery.users(idusers, name, phone)
    values('${Id}', '${Name}', '${Phone}');`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function getCurrentOrder(deliverId, callback) {
    try {
        console.log(`making query to get current order for deliver: ${deliverId}`)
        let sql = `SELECT o.city, o.street, o.number, d.orderId, d.status
        FROM orders.orders o
        INNER JOIN delivery.deliver d ON o.orderId = d.orderId
        WHERE d.userId = ${deliverId}
        AND d.status < 2
        `
        db.query(sql, callback)
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

module.exports = { getCurrentOrder, loginDelivery, signinDelivery }