const db = require('../dal/DB');

async function getAllProduct(callback) {
    try {
        console.log('in get all product function')
        let sql = `select * from products`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}


// למנהל, אפשרות להוסיף פריט חדש לתפריט
async function addNewProduct(name, price, enable, callback) {
    try {
        console.log('in add product function')
        let sql = `insert into products(name, price, enable)
    values('${name}', ${price}, ${enable})`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

// למנהל, אפשרות למחוק פריט מהתפריט
async function deleteProduct(id, callback) {
    try {
        console.log('in delete function')
        console.log(id)
        let sql = `delete from products where id=${id}`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

// למנהל, אפשרות לעדכן את הפריט שבתפריט
async function updateProduct(id, name, price, enable, callback) {
    try {
        console.log('in update product')
        console.log(id)
        let sql = `update products
    set name = '${name}', price=${price}, enable= ${enable}
    where id=${id};`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}


async function getalladdings(callback) {
    try {
        console.log('in get all adding function')
        let sql = `select * from adding`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function getpizzaitem(callback) {
    try {
        console.log('in get pizza item function')
        let sql = `select * from products where name = 'pizza'`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}


module.exports = { getpizzaitem, getalladdings, updateProduct, getAllProduct, addNewProduct, deleteProduct }
