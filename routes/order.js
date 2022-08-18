const express=require('express');
const mysql = require('mysql')
const db=require('../config/db.configs')
const connection = mysql.createConnection(db.database)

connection.connect(function (err) {
    if (err){
        console.log(err)
    }else {
        console.log("connected to mysql");
        var userTableQuery="CREATE TABLE IF NOT EXISTS `order` (id VARCHAR(255) PRIMARY KEY ,cusId VARCHAR(255) FOREIGN KEY REFERENCES customer (id) ,date VARCHAR(255))"
        connection.query(userTableQuery,function (err,result) {
            if (err)throw err;
            // console.log(result)
            if (result.warningCount===0){
                console.log("Order created table")
            }
        })
    }

})

const router=express.Router();

router.get('/',(req,res)=>{
    var query="SELECT * FROM  `order`";
    connection.query(query,(err,rows)=>{
        if (err)throw err;
        res.send(rows)
    })

})
router.post('/',(req,res)=>{
    const id=req.body.id;
    const cusId=req.body.cusId;
    const date=req.body.date;


    var query="INSERT INTO  `order`(id,cusId,date) VALUES (?,?,?)";
    connection.query(query,[id,cusId,date],(err)=>{
        if (err){
            res.send({'message':'duplicate Entry'})
        }else {
            res.send({'message':'Order created'})
        }
    })

})
router.put('/',(req,res)=>{
    const id=req.body.id;
    const cusId=req.body.cusId;
    const date=req.body.date;

    var query="UPDATE  `order` SET cusId=?,date=? WHERE id=?";
    connection.query(query,[cusId,date,id],(err,rows)=>{
        if (err) throw err;
        if (rows.affectedRows>0){
            res.send({'message': 'Order updated'})
        }else {
            res.send({'message': 'Order not founded'})
        }

    })

})
router.delete('/:id',(req,res)=>{
    const id=req.params.id;
    var query="DELETE FROM  `order` WHERE id=?";
    connection.query(query,[id],(err,rows)=>{
        if (err) throw err;
        if (rows.affectedRows>0){
            res.send({'message':'Order deleted'})
        }else {
            res.send({'message':'no such Order'})
        }
    })
})
router.get('/:id',(req,res)=>{
    const id=req.params.id;
    var query="SELECT * FROM  `order` WHERE id=?";
    connection.query(query,[id],(err,rows)=>{
        if (err)throw err;
        res.send(rows)
    })
})

module.exports=router;