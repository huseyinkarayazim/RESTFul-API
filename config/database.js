const mongoose=require('mongoose');

const db =()=>{
    mongoose.connect(process.env.MONGO_URI,{
       // userNewUrlParser:true,
       // userUnifiedTopology:true
    }).then(()=>{
        console.log("Mongodb Connection Open...")
    }).catch((error)=>{

        console.log("Mongodb Connection Fail Error : ",error )
    })

 }
 module.exports=db