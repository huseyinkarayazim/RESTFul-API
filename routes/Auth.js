const express=require('express')
const {register,login} =require("../controllers/Auth.js");
const router=express.Router();

//#region  V1
router.post('/v1/register',register)
router.post('/v1/login',login)

//#endregion
module.exports=router