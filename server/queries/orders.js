const db = require('../dal/DB');

async function getOrderDataByOrderId(order_id, callback) {
    try {
        console.log('in get order data by id function')
        console.log(order_id)
        let sql = `select * from orders where id=${order_id}`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function createneworder(city, street, number, order_date, comment, price, name, phone, callback) {
    try {
        console.log('in create new order')
        let sql = `insert into orders(clint_id, city, street, number, comment, price,accept, name)
values(${phone}, '${city}', '${street}', '${number}', '${comment}', '${price}',false, '${name}')`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function insertintobranchorders(order_id, branch_id, callback) {
    try {
        console.log(order_id + branch_id)
        let sql = `insert into branch_orders(branch_id, order_id, send)
    values(${order_id}, ${branch_id}, false)`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function insertintoorderdetailes(order_id, product_id, amount, price, callback) {
    try {
        console.log(order_id + product_id + price)
        let sql = `insert into order_details(order_id, product_id, amount, price, ready, accept)
    values(${order_id}, ${product_id}, ${amount}, ${price}, false, false)`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function getproductandpricebyorderid(order_id, callback) {
    try {
        console.log('in get product and price by order id' + order_id)
        let sql = `select product_id, price from order_details where order_id = ${order_id}`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function getaddingnbyorderid(id, callback) {
    try {
        console.log('in get adding by order id' + id)
        let sql = `SELECT adding.name
    FROM adding Join order_details
    ON adding.id = order_details.product_id
    where order_details.price<3 And order_details.order_id = ${id}`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function getproductsnbyorderid(id, callback) {
    try {
        console.log('in get products by order id' + id)
        let sql = `SELECT products.name
    FROM products Join order_details
    ON products.id = order_details.product_id
    where order_details.price>3 And order_details.order_id = ${id}`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function changesendbyorderid(id, callback) {
    try {
        console.log('in change set by orderid function' + id)
        let sql = `UPDATE branch_orders
    SET 
        send = true
    WHERE
        order_id =${id}`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

//מיצר את השאילתא שמוצאת הזמנה פעילה לפי מספר טלפון
async function getOrderByPhone(phone, callback) {
    try {
        console.log('in getOrderByPhone' + phone)

        //השאילתא:
        let sql = `
    select * from orders.orders
    where clint_id = ${phone} and accept = false;
    `;

        //שולחים את השאילתא לשלב הבא שמתקשר עם הדאטה בייס.
        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}




module.exports = { getOrderByPhone, getaddingnbyorderid, getproductsnbyorderid, getproductandpricebyorderid, changesendbyorderid, createneworder, insertintobranchorders, getOrderDataByOrderId, getproductandpricebyorderid, insertintoorderdetailes }