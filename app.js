const express = require('express');
const user=require('./routes/users')
const app = express();
const port = 4000;

app.use(express.json())
app.use('/users',user)

app.listen(port,()=>{
    console.log(`starting on ${port}`);
})



