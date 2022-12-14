const express=require('express');
const mysql = require('mysql')
const db=require('../configs/db.configs')
const connection = mysql.createConnection(db.database)

connection.connect(function (err) {
    if (err){
        console.log(err)
    }else {
        console.log("connected to mysql");
        var userTableQuery="CREATE TABLE IF NOT EXISTS customer (id VARCHAR(255) PRIMARY KEY ,name VARCHAR(255),address VARCHAR(255),contact VARCHAR(10))"
        connection.query(userTableQuery,function (err,result) {
            if (err)throw err;
            // console.log(result)
            if (result.warningCount===0){
                console.log("customer created table")
            }
        })
    }

})

const router=express.Router();

router.get('/',(req,res)=>{
    var query="SELECT * FROM customer";
    connection.query(query,(err,rows)=>{
        if (err)throw err;
        res.send(rows)
    })

})
router.post('/',(req,res)=>{
    const id=req.body.id;
    const name=req.body.name;
    const address=req.body.address;
    const contact=req.body.contact;

    var query="INSERT INTO customer(id,name,address,contact) VALUES (?,?,?,?)";
    connection.query(query,[id,name,address,contact],(err)=>{
        if (err){
            res.send({'message':'duplicate Entry'})
        }else {
            res.send({'message':'customer created'})
        }
    })

})
router.put('/',(req,res)=>{
    const id=req.body.id;
    const name=req.body.name;
    const address=req.body.address;
    const contact=req.body.contact;

    var query="UPDATE customer SET name=?,address=?,contact=? WHERE id=?";
    connection.query(query,[name,address,contact,id],(err,rows)=>{
        if (err) throw err;
        if (rows.affectedRows>0){
            res.send({'message': 'customer updated'})
        }else {
            res.send({'message': 'customer not founded'})
        }

    })

})
router.delete('/:id',(req,res)=>{
    const id=req.params.id;
    var query="DELETE FROM customer WHERE id=?";
    connection.query(query,[id],(err,rows)=>{
        if (err) throw err;
        if (rows.affectedRows>0){
            res.send({'message':'customer deleted'})
        }else {
            res.send({'message':'no such customer'})
        }
    })
})
router.get('/:id',(req,res)=>{
    const id=req.params.id;
    var query="SELECT * FROM customer WHERE id=?";
    connection.query(query,[id],(err,rows)=>{
        if (err)throw err;
        res.send(rows)
    })
})

module.exports=router;