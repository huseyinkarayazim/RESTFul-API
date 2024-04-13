const express = require('express')
const {createData,viewData,updateData,deleteData}=require('../controllers/Posts.js')
const router=express.Router();

router.post('/v1/data',createData)
router.get('/v1/data',viewData)
router.patch('/v1/data',updateData)
router.delete('/v1/data',deleteData)
module.exports=router