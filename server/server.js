const express = require('express')
const cors = require('cors')

const login_router= require('./routers/login')
const branch_router= require('./routers/branch')
const signin_router= require('./routers/signin')
const menue_router= require('./routers/menue')
const orders_router= require('./routers/orders')
const admin_router= require('./routers/admin')

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



