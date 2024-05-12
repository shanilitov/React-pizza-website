const db = require('../dal/DB');


async function signin(name, password, branch, callback) {
    try {
        console.log('in signin function')
        let sql = `insert into users(user_name, password,branch_id, adamin)
    values('${name}', '${password}', '${branch}', false);`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
    }
}

async function getuseridbyname(name, callback) {
    try {
        console.log('in get users id by name func ' + name);
        let sql = `select id from users where user_name = '${name}'`

        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
    }
}


module.exports = { signin, getuseridbyname }
