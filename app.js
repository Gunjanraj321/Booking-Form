require("dotenv").config();
const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const cors=require("cors");
const db = require('./database/data');
const router = require("./router/userRouter")

const port = process.env.PORT || 3000;

const app= express();
app.use(cors());
app.use(express.json());


app.use("/user",router);


app.use(express.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log("server running at port=",port);
    db.connect((err)=>{
        if(err){
            console.log("error connecting to database",err)
            return;
        }
        console.log("connected to database")
    }) 
    app.get("/welcome", (req, res) => {
        res.sendFile(path.join(__dirname, "public", "index.html"));
      });
});