const mysql = require("mysql2");
const db = require('../database/data');

const getUsers = (req,res) =>{
    const sql = "SELECT * FROM user";
    db.query(sql, (err,data) =>{
        if(err){
            console.log("got error while fetching data")
            res
                .status(401)
                .json({message:"error occured while fetching data or no record found"})
        }else{
            res.json(data);
        }
    })
}

const createUser = (req, res)=>{
    const { name , email, phone } = req.body;
    console.log(name,email, phone);
    const sql = "INSERT INTO user (name,email,phone) VALUES (?,?,?)";
    db.query(sql , [name , email , phone] , (err, data) =>{
        if(err){
            console.log(err,"while inserting")
            res
                .status(404)
                .json({error:"Error occuered while inserting data"})
        } else{
            res.status(201).json({message:"user inserted successfully"})
        } 
    })
}

const deleteUser =  (req, res) =>{
    const userId = req.params.id;
    const sql= "DELETE FROM user WHERE id= ?"
    db.query(sql , [userId] , (err,data)=>{
       if(err){
        console.log('user id not found')
        res.status(400).json({message:"user detailed not found or some error occured"})
       } else{
            res.json({message:"data deleted suucesfully"})
       }
    })
}

module.exports ={ getUsers , createUser , deleteUser };
