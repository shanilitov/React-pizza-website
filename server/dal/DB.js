const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10, // הגדרת מקסימום חיבורים
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'od1cos2mysql'
});

async function query(sql, callback) {
    console.log('\nserver sql in DB: ' + sql);
    try {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection from pool:', err);
                callback(false);
                return;
            }

            connection.query(sql, (err, result) => {
                console.log('err: ' + err, 'result: ' + JSON.stringify(result));

                connection.release(); // שחרור החיבור בחזרה לבריכה

                if (err || result === undefined) {
                    callback(false);
                } else {
                    result = JSON.stringify(result);
                    console.log(`in query, the response: ${result}`);
                    callback(result);
                }
            });
        });
    }
    catch (err) {
        console.log('err')
        callback(false)
    }
}

module.exports = { query };

