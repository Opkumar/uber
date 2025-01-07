const dotenv = require("dotenv");
dotenv.config()

const express = require("express");
const connectDB = require("./db/db");
const cors = require("cors");
const userRoute = require("./routes/user.route");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


connectDB();

// app.use("/",(req,res)=>{
//     res.send("hello om prakash")
// })
app.use("/users",userRoute);

module.exports = app;