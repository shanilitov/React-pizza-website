const db = require('../dal/DB');

//מיצר את השאילתא שתחזיר את הצ,אט המבוקש
async function getChat(orderId, connection, callback) {

    try {
        let reverse_connection = connection[1] + connection[0]// connection.split('').reverse().join();
        console.log("reverse connection" + reverse_connection)
        //השאילתא:
        let sql = `
        select * from orders.chat
        where orderId = ${orderId} 
        and (connection = '${connection}' or connection = '${reverse_connection}');`;

        //שולחים את השאילתא לשלב הבא שמתקשר עם הדאטה בייס.
        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}

//מיצר את השאילתא ששולחת את ההודעה
async function sendMessage(message, orderId, connection, callback) {
    try {
        console.log('in send message' + message)

        //השאילתא:
        let sql = `
        INSERT INTO orders.chat (orderId, connection, message)
        VALUES (${orderId}, '${connection}', '${message}');`;

        //שולחים את השאילתא לשלב הבא שמתקשר עם הדאטה בייס.
        db.query(sql, callback);
    }
    catch (err) {
        console.log(`in querise : ${err}`)
        //throw err;
    }
}


module.exports = { getChat, sendMessage }