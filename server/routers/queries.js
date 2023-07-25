const db = require('../dal/DB');
// const config = require('../config');

async function loginByNameAndPass(name, password, callback) {
    console.log('name' + name, 'password' + password)
    console.log('making sql requset')
    let sql = `select * from users where user_name = '${name}' and password ='${password}';`
    db.query(sql, callback);
}

async function getAllBranches(callback) {
    let sql = `select id, name from branch`
    db.query(sql, callback)
}

async function getBranchById(branchId, callback) {
    let id = JSON.stringify(branchId)
    console.log(id + 'in')
    id = parseInt(id)

    console.log('in get branch by id query function')
    let sql = `select * from branch where id=${id}`
    db.query(sql, callback)
}

async function getOrdersByBranchId(branchId, callback) {

    console.log('in get order by branch id function')
    let sql = `SELECT order_id FROM branch_orders WHERE branch_id = ${branchId} and send=false`
    db.query(sql, callback)
}

async function signin(name, password, branch, callback) {
    console.log('in signin function')
    let sql = `insert into users(user_name, password,branch_id, adamin)
    values('${name}', '${password}', '${branch}', false);`
    db.query(sql, callback)
}

async function getAllProduct(callback) {
    console.log('in get all product function')
    let sql = `select * from products`
    db.query(sql, callback)
}

async function addNewProduct(name, price, enable, callback) {
    console.log('in add product function')
    let sql = `insert into products(name, price, enable)
    values('${name}', ${price}, ${enable})`
    db.query(sql, callback)
}

async function deleteProduct(id, callback) {
    console.log('in delete function')
    console.log(id)
    let sql = `delete from products where id=${id}`
    db.query(sql, callback)
}

async function updateProduct(id, name, price, enable, callback) {
    console.log('in update product')
    console.log(id)
    let sql = `update products
    set name = '${name}', price=${price}, enable= ${enable}
    where id=${id};`
    db.query(sql, callback)
}

async function getOrderDataByOrderId(order_id, callback) {
    console.log('in get order data by id function')
    console.log(order_id)
    let sql = `select * from orders where id=${order_id}`
    db.query(sql, callback)
}

async function getallbranchesdata(callback) {
    console.log('in get all branches data function')
    let sql = `select * from branch`
    db.query(sql, callback)
}

async function getalladdings(callback) {
    console.log('in get all adding function')
    let sql = `select * from adding`
    db.query(sql, callback)
}

async function getpizzaitem(callback) {
    console.log('in get pizza item function')
    let sql = `select * from products where name = 'pizza'`
    db.query(sql, callback)
}

async function getuseridbyname(name, callback) {
    console.log('in get users id by name func ' + name);
    let sql = `select id from users where user_name = '${name}'`
    db.query(sql, callback)
}

async function createneworder(city, street, number, order_date, comment, price, name, callback) {
    console.log('in create new order')
    let sql = `insert into orders(city, street, number, comment, price,accept, name)
values('${city}', '${street}', '${number}', '${comment}', '${price}',false, '${name}')`
    db.query(sql, callback)
}

async function insertintobranchorders(order_id, branch_id, callback) {
    console.log(order_id + branch_id)
    let sql = `insert into branch_orders(branch_id, order_id, send)
    values(${order_id}, ${branch_id}, false)`
    db.query(sql, callback)
}

async function insertintoorderdetailes(order_id, product_id, price, callback) {
    console.log(order_id + product_id + price)
    let sql = `insert into order_details(order_id, product_id, amount, price, ready, accept)
    values(${order_id}, ${product_id},1, ${price}, false, false)`
    db.query(sql, callback)
}

async function getproductandpricebyorderid(order_id, callback) {
    console.log('in get product and price by order id' + order_id)
    let sql = `select product_id, price from order_details where order_id = ${order_id}`
    db.query(sql, callback)
}

async function getaddingnamebyid(id, callback) {
    console.log('in get adding name by id function' + id)
    let sql = `select name from adding where id=${id}`
    db.query(sql, callback)
}

async function getaddingnbyorderid(id, callback) {
    console.log('in get adding by order id' + id)
    let sql = `SELECT adding.name
    FROM adding Join order_details
    ON adding.id = order_details.product_id
    where order_details.price<3 And order_details.order_id = ${id}`
    db.query(sql, callback)
}

async function getproductsnbyorderid(id, callback) {
    console.log('in get products by order id' + id)
    let sql = `SELECT products.name
    FROM products Join order_details
    ON products.id = order_details.product_id
    where order_details.price>3 And order_details.order_id = ${id}`
    db.query(sql, callback)
}

async function changesendbyorderid(id, callback) {
    console.log('in change set by orderid function' + id)
    let sql = `UPDATE branch_orders
    SET 
        send = true
    WHERE
        order_id =${id}`
    db.query(sql, callback)
}

async function getordermoney(id, callback) {
    console.log('in get order mony function' + id)
    let sql = `SELECT orders.price 
    FROM orders JOIN branch_orders
    ON orders.id = branch_orders.order_id
    WHERE branch_orders.branch_id =${id}`
    db.query(sql, callback)
}
module.exports = {getordermoney, changesendbyorderid, getproductsnbyorderid, getaddingnbyorderid, getaddingnamebyid, getproductandpricebyorderid, insertintoorderdetailes, insertintobranchorders, createneworder, getuseridbyname, getpizzaitem, getalladdings, getallbranchesdata, getOrderDataByOrderId, updateProduct, deleteProduct, addNewProduct, loginByNameAndPass, getAllBranches, getBranchById, getOrdersByBranchId, signin, getAllProduct }