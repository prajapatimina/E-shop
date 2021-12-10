const express = require("express")
const app = express();
const mongoose = require("mongoose")
// require("dotenv").config()

require('./db')
app.use(express.json())
const category = require('./routes/category')
const product = require('./routes/product')
const users = require('./routes/user')
const order = require('./routes/order')


app.use('/api/category',category)
app.use('/api/product', product)
app.use('/api/users', users)
app.use('/api/order', order)


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})