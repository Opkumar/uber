const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config()

app.use("/",(req,res)=>{
    
    res.send("hello om prakash")
})

app.listen(process.env.PORT || 4000 ,()=>{
    console.log(`server is running at port ${process.env.PORT}`)
})