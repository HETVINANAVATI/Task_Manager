const mongoose = require('mongoose')
const Task = mongoose.model('Task',{
    description:{
        type:String,
        trim:true,
        required:true
    },
    CompletedTask:{
        type:Boolean,
        default:false
    }
})
module.exports=Task;
/* const d1=new Task({
    CompletedTask:true
})
d1.save().then(()=>{
    console.log(d1)
}).catch((error)=>{
    console.log(error)
}) */