const mongoose=require('mongoose')

const AuthSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        
    },
     date:{
        type:Date,
        defaul:new Date()
    }
})
module.exports=mongoose.model('Auth',AuthSchema)