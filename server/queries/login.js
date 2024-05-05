const db = require('../dal/DB');

async function loginByNameAndPass(name, password, callback) {
    console.log('name' + name, 'password' + password)
    console.log('making sql requset')
    let sql = `select * from users where user_name = '${name}' and password ='${password}';`
    try {
        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}


module.exports = {loginByNameAndPass}