const db = require('../dal/DB');

async function loginDelivery(name, id, callback) {
    console.log('name ' + name, 'id ' + id)
    console.log('making sql requset')
    let sql = `select * from delivery.users where name = '${name}' and idusers =${id};`
    try {
        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

async function signinDelivery(Id, Name, Phone, callback) {
    console.log('in signin function')
    let sql = `insert into delivery.users(idusers, name, phone)
    values('${Id}', '${Name}', '${Phone}');`
    try {
        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

module.exports = {loginDelivery, signinDelivery}