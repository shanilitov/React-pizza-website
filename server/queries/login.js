const db = require('../dal/DB');

async function loginByNameAndPass(name, password, callback) {
    try {
        console.log('name' + name, 'password' + password)
        console.log('making sql requset')
        let sql = `
        select * 
        from branches.users 
        where user_name = '${name}' 
        and password ='${password}';`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}


module.exports = { loginByNameAndPass }