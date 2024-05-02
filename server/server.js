const express = require('express')
const cors = require('cors')

const login_router= require('./routers/login')
const branch_router= require('./routers/branch')
const signin_router= require('./routers/signin')
const menue_router= require('./routers/menue')
const orders_router= require('./routers/orders')
const admin_router= require('./routers/admin')
const chat_router= require('./routers/chat')

const app = express()

app.use(cors())
app.use(express.json())


app.listen(3600, ()=>{console.log('http://localhost:3600')})
app.get('/', (req, res)=>{
    res.send({message:"it's the pizza shop server.\nYou're more then welcom to visit the website..."})
})


app.use('/login', login_router)
app.use('/branches', branch_router)
app.use('/signin', signin_router)
app.use('/menue', menue_router)
app.use('/orders', orders_router)
app.use('/admin', admin_router)
app.use('/chat', chat_router)



//WebSocket area:

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// מערך לקוחות מחוברים
const clients = [];

// פונקציה לשליחת הודעה ללקוח מסוים
function sendMessage(firstclient, secondclient, message) {
    console.log(`Send to the chat of: ${firstclient} and ${secondclient}, the message: ${message}`)
    const client1 = clients.find(client => client.id === firstclient);
    if (client1) {
        client1.socket.send(JSON.stringify(message));
    }
    const client2 = clients.find(client => client.id === firstclient);
    if (client2) {
        client2.socket.send(JSON.stringify(message));
    }
}

wss.on('connection', function connection(ws) {
    // כאשר לקוח מתחבר
    ws.on('message', function incoming(message) {
        // id = מספר ההזמנה + סוג הצד 
        //123S דוגמא
        const data = JSON.parse(message);
        // הוספת לקוח לרשימת הלקוחות המחוברים
        clients.push({ id: data.id, socket: ws });
    });

    ws.on('close', function close() {
        // מחיקת לקוח מרשימת הלקוחות המחוברים בעת התנתקות
        clients = clients.filter(client => client.socket !== ws);
    });
});



module.exports = {sendMessage}