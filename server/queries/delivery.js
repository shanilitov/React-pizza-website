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

async function signinDelivery(Id, Name, Phone, branch, email, callback) {
    try {
        console.log('in signin function')
        let sql = `insert into delivery.users(idusers, name, phone, branch, email)
    values('${Id}', '${Name}', '${Phone}', ${branch}, '${email}');`

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
        INNER JOIN delivery.deliver d ON o.id = d.orderId
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

async function getOrederWaiting(branchId, callback) {
    try {
        console.log(`making query to get the order to the new deliver for branch number: ${branchId}`)
        // השאילתא אמורה למצוא את ההזמנה הבאה של השליח.
        // השאילתא מוצאת את ההזמנות של הסניף המבוקש שלא משויכות למשלוח, ושאינם איסוף עצמי
        let sql = `
        SELECT o.*
        FROM orders.orders as o
        JOIN branches.branch_orders as bo ON o.id = bo.order_id
        WHERE bo.branch_id = ${branchId}
            and bo.status < 2
            and o.id not in (select orderId
                            from delivery.deliver)
            AND o.id not in (select *
                            from orders.takeaway)
        ORDER BY o.id ASC
        LIMIT 1;
        `
        db.query(sql, callback)
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;

    }
}

async function getDeliverBranch(deliverId, callback) {
    try {
        console.log('in get branch for delivey guy function')
        let sql = `
        SELECT branch
        FROM delivery.users
        WHERE idusers = ${deliverId}
        `

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function addNewDeliveryToDeliver(deliverId, orderId, callback) {
    try {
        console.log('in addNewDeliveryToDeliver function')
        let sql = `
        INSERT INTO delivery.deliver (orderId, userId, status) 
        VALUES (${orderId}, ${deliverId}, 1);
        `

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
    }
}

async function getStatus(orderId, callback) {
    try {
        console.log(`Get the order status for order ${orderId}`)
        let query = `
        select status 
        from delivery.deliver
        where orderId = ${orderId}
        `
        db.query(query, callback)
    }
    catch (err) {
        console.log(`in querise : ${err}`)
    }
}

async function changeSatus(orderId, deliverId, status, callback) {
    console.log(`in change deliver order status, to status: ${status}`)
    let query = `
    UPDATE delivery.deliver 
    SET status = ${status} 
    WHERE orderId = ${orderId} and userId = ${deliverId};
    `
    db.query(query, callback)
}

module.exports = { changeSatus, getStatus, getCurrentOrder, loginDelivery, signinDelivery, getDeliverBranch, getOrederWaiting, addNewDeliveryToDeliver }