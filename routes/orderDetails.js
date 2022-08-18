const express=require('express');
const mysql = require('mysql')
const db=require('../configs/db.configs')
const connection = mysql.createConnection(db.database)

connection.connect(function (err) {
    if (err){
        console.log(err)
    }else {
        console.log("connected to mysql");
        var userTableQuery="CREATE TABLE IF NOT EXISTS `orderDetails` (oId VARCHAR(255) ,itemId VARCHAR(255),total double,qtyOnHand int(10),CONSTRAINT PRIMARY KEY (oId,itemId),CONSTRAINT FOREIGN KEY (oId) REFERENCES `order`(id),CONSTRAINT FOREIGN KEY (itemId) REFERENCES item(id))"
        connection.query(userTableQuery,function (err,result) {
            if (err)throw err;
            // console.log(result)
            if (result.warningCount===0){
                console.log("OrderDetails created table")
            }
        })
    }

})

const router=express.Router();

router.get('/',(req,res)=>{
    var query="SELECT * FROM  `orderDetails`";
    connection.query(query,(err,rows)=>{
        if (err)throw err;
        res.send(rows)
    })

})
router.post('/',(req,res)=>{
    const oId=req.body.oId;
    const itemId=req.body.itemId;
    const total=req.body.total;
    const qtyOnHand=req.body.qtyOnHand;


    var query="INSERT INTO  `orderDetails`(oId,itemId,total,qtyOnHand) VALUES (?,?,?,?)";
    connection.query(query,[oId,itemId,total,qtyOnHand],(err)=>{
        if (err){
            res.send({'message':'duplicate Entry'})
        }else {
            res.send({'message':'OrderDetails created'})
        }
    })

})
router.put('/',(req,res)=>{
    const oId=req.body.oId;
    const itemId=req.body.itemId;
    const total=req.body.total;
    const qtyOnHand=req.body.qtyOnHand;

    var query="UPDATE  `orderDetails` SET itemId=?,total=?,qtyOnHand=? WHERE oId=?";
    connection.query(query,[itemId,total,qtyOnHand,oId],(err,rows)=>{
        if (err) throw err;
        if (rows.affectedRows>0){
            res.send({'message': 'OrderDetails updated'})
        }else {
            res.send({'message': 'OrderDetails not founded'})
        }

    })

})
router.delete('/:oId',(req,res)=>{
    const oId=req.params.oId;
    var query="DELETE FROM  `orderDetails` WHERE oId=?";
    connection.query(query,[oId],(err,rows)=>{
        if (err) throw err;
        if (rows.affectedRows>0){
            res.send({'message':'OrderDetails deleted'})
        }else {
            res.send({'message':'no such OrderDetails'})
        }
    })
})
router.get('/:oId',(req,res)=>{
    const oId=req.params.oId;
    var query="SELECT * FROM  `orderDetails` WHERE oId=?";
    connection.query(query,[oId],(err,rows)=>{
        if (err)throw err;
        res.send(rows)
    })
})

module.exports=router;