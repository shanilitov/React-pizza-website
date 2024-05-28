const db = require('../dal/DB');

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

async function createneworder(city, street, number, order_date, comment, price, name, phone, callback) {
    try {
        console.log('in create new order');

        // המרת תאריך לפורמט YYYY-MM-DD
        let formattedDate = new Date(order_date).toISOString().split('T')[0];

        let sql = `INSERT INTO orders.orders 
        (clint_id, city, street, number, order_date, comment, price, accept, name) 
        VALUES ('${phone}', '${city}', '${street}', ${number}, '${formattedDate}', '${comment}', ${price}, 0, '${name}');`;

        db.query(sql, callback);
    } catch (err) {
        console.log(`in querise : ${err}`);
        //throw err;
    }
}



async function insertintobranchorders(order_id, branch_id, callback) {
    try {
        console.log(order_id + branch_id)
        let sql = `insert into branches.branch_orders(branch_id, order_id, send)
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
        let sql = `insert into orders.order_details(order_id, product_id, amount, price, ready, accept)
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
        let sql = `select product_id, price from orders.order_details where order_id = ${order_id}`

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
    FROM products.adding adding Join orders.order_details order_details
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
        let sql = `SELECT products.id, products.name
                 FROM products.products products 
                 Join orders.order_details order_details
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
        let sql = `UPDATE branches.branch_orders
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

async function get_full_order(orderId, callback) {
    try {
        let query = `
        SELECT o.*, od.order_products, tkw.orderId as is_take_away
        FROM orders.orders AS o
        JOIN (
            SELECT order_Id, 
                   CONCAT('[', GROUP_CONCAT(
                       DISTINCT CONCAT(
                           '{', 
                           '"product_id": ', od1.product_id, ', ',
                           '"product_name": "', p.name, '", ',
                           '"price": ', p.price, ', ',
                           '"amount": ', od1.amount, ', ',
                           '"ready": ', od1.ready, ', ',
                           '"accept": ', od1.accept, 
                           '}'
                       )
                   SEPARATOR ', '), ']') AS order_products
            FROM orders.order_Details AS od1
            JOIN products.products AS p ON p.id = od1.product_id
            GROUP BY order_Id
        ) AS od ON o.id = od.order_Id
        left join orders.takeaway AS tkw ON o.id = tkw.orderid
        WHERE o.id = ${orderId};
        `
        db.query(query, callback)
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function get_order_status(orderId, callback) {
    try {
        console.log(orderId)
        let query = `
                    select distinct o.accept as client_accepted, bo.send as branch_send, d.status as delivery_status
                    from (
	                    select * 
                        from orders.orders as o1
                        where o1.id = ${orderId}
                    ) as o
                    LEFT join branches.branch_orders as bo on o.id = bo.order_Id
                    LEFT join delivery.deliver as d on d.orderId = o.id; 
                    `
        db.query(query, callback)

    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }


}

async function get_ready_products_list(orderId, callback){
    console.log('\nin get the ready products list')
    let query = `
    select product_id
    from orders.order_details as o
    where o.order_id = ${orderId} and o.ready = 1;
    `
    db.query(query, callback)
}

async function takeaway(orderId, calback){
    console.log('\nin takeAway')
    let query = `
    INSERT INTO orders.takeaway(orderId)
    VALUES(${orderId});
    `
}

async function setProductStatus(orderId, productId, callback){
    console.log('in setProductStatus function')
    let query = `
    UPDATE orders.order_details as o
    SET ready = true
    WHERE order_id = ${orderId} and product_id = ${productId};
    `
    db.query(query, callback)
}

module.exports = {setProductStatus, takeaway, get_ready_products_list, get_order_status,  get_full_order, getOrderByPhone, getaddingnbyorderid, getproductsnbyorderid, getproductandpricebyorderid, changesendbyorderid, createneworder, insertintobranchorders, getOrderDataByOrderId, getproductandpricebyorderid, insertintoorderdetailes }