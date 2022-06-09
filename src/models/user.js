const mongoose = require('mongoose')
const validator=require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema=mongoose.Schema({
    name:{
       type: String,
       trim:true,
       required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:0,
        validate(value){
            if(!validator.isEmail(value))
            throw new Error("Email must be valid");
        }
    },
    age:{
        type: Number,
        default:0,
        validate(value){
            if(value<0)
            throw new Error("Age must be positive");
        }   },
        password:
        {
            type:String,
            required:true,
            minlength:7,
            trim:true,
            validate(value){
                if(value.toLowerCase()==="password")
                throw new Error("Password can't be password")
            }
        },
        tokens:[{
            token:{
                type:String,
                required:true
            }
        }]
})
userSchema.methods.generateAuthToken=async function()
{
    const user=this
    const token=jwt.sign({_id:user._id.toString()},"This is a new user")
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token

}
userSchema.statics.findByCredentials=async (email,password)=>{
    const user=await User.findOne({email})
    if(!user)
    {
        throw new Error('Unable to login')
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch)
    {
        throw new Error('Unable to login')
    }
    return user
}
userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password'))
    {
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})
const User = mongoose.model('User',userSchema)
module.exports=User;
/* const u1=new User({
    name:'Hetvi Nanavati',
    email:"hetvi.nanavati@gmail.com ",
    age:5,
    password: " h1852etvi"
})
u1.save().then(()=>{
   console.log(u1)
}).catch((error)=>{
   console.log(error)
})   */