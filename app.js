const express = require('express');
const customer=require('./routes/customer')
const item=require('./routes/item')
const order=require('./routes/order')
const orderDetails=require('./routes/orderDetails')
const app = express();
const port = 4000;

app.use(express.json())
app.use('/customer',customer)
app.use('/item',item)
app.use('/order',order)
app.use('/orderDetails',orderDetails)

app.listen(port,()=>{
    console.log(`starting on ${port}`);
})



