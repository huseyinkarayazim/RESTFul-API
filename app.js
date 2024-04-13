const express=require('express');
const cors=require('cors');
const dotenv =require('dotenv');
const mongoose=require('mongoose');
const db=require('./config/database.js');
const Auth=require("./routes/Auth.js");
const Posts=require('./routes/Posts.js');



dotenv.config();

const app=express();
app.use(cors());
app.use(express.json({limit:'30mb',extended:true}))

app.use(express.urlencoded({limit:'30mb',extended:true}))

app.get('/',(req,res)=>{
    res.json({message:"SERVER IS WORKING"})
})
db()
app.use("/",Auth)
app.use("/",Posts)
const port=process.env.SERVER_PORT=5000;
app.listen(port,()=>{
    console.log("server is running on port :",port);
})