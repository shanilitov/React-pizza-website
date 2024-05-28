const mysql = require('mysql');

async function query(sql, callback) {
    console.log('\nserver sql in DB: ' + sql)
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'od1cos2mysql',
        // database: 'pizzawebsite'
    });
    // כאן מריצים את השאילתה ואחרי שיש תשובה מפעילים את הפונקצית calback עם הפרמטר
    connection.connect((err) => {
        if (err){
            console.log(err)
            callback(false)
        }
        else {
            connection.query(sql, (err, result, field) => {
                console.log('err: ' + err, 'result: ' + JSON.stringify(result), "field: " + field)

                if (err || result === undefined)
                    callback(false)
                else {

                    result = JSON.stringify(result)
                    console.log(`in query, the response: ${result}`)

                    if(result)
                        callback(result);
                }
            })
        }

    })
}
module.exports = { query };