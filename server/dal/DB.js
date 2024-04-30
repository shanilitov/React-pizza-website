const mysql = require('mysql');
// const config = require('./config')

async function query(sql, callback) {
    console.log('server sql in DB: ' + sql)
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'od1cos2mysql',
        database: 'pizzawebsite'
    });

    connection.connect((err) => {
        if (err)
            callback(false)
        connection.query(sql, (err, result, field) => {
            console.log('err: ' + err, 'result: ' + JSON.stringify(result), "field: " + field)
            
            if (err)
                callback(false)
         
            result = JSON.stringify(result)
            console.log(`in query, the response: ${result}`)

            
            callback(result);
        })


    })
}

module.exports = { query };