const express=require('express')
const User=require('../models/user')
const router=new express.Router()
const auth = require('../middleware/auth')
/* app.post('/users',(req,res)=>{
    const user=new User(req.body)
user.save().then(()=>{
   res.status(201).send(user)
}).catch((error)=>{
    res.status(400).send(error)
})     
}) */
router.post('/users',async(req,res)=>{
    const user=new User(req.body)
    try{
        await user.save()
        const token=await user.generateAuthToken()
        res.status(201).send({user,token})
    }
catch(error){
    res.status(400).send(error)
}   
})
router.post('/users/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.send({user,token})
    }
    catch(e)
    {
       res.status(400).send()
    }
   
})
/* app.get("/users",(req,res)=>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((error)=>
    {
        res.send(error)
    })
}) */
/* router.get("/users",auth,async(req,res)=>{
   
    try
    {
       const users= await User.find({})
        res.send(users)
    }catch(error)
    {
        res.status(500).send(error)
    }
}) */
router.get("/users/me",auth,async(req,res)=>{
   
    res.send(req.user)
})
/* app.get("/users/:id",(req,res)=>{
    const _id=req.params.id
    User.findById(_id).then((users)=>{
        if(!users)
        return res.status(404).send()
        res.send(users)
    }).catch((error)=>
    {
        res.status(500).send()
    })
}) */
router.get("/users/:id",async(req,res)=>{
    const _id=req.params.id
    try{
        const users=await User.findById(_id)
            if(!users)
            return res.status(404).send()
            res.send(users)
    }catch(error)
    {
        res.status(500).send()
    }
})
router.patch("/users/:id",async(req,res)=>{
   const updates=Object.keys(req.body)
   const allowedUpdates = ['name','email','password','age']
   const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
   if(!isValidOperation)
   return res.status(400).send("Invalid update");
    try{
       /*  const users=await User.findByIdAndUpdate(req.params.id,req.body,{new:  true,runValidators:true}) */
       const users=await User.findById(req.params.id)
       updates.forEach((update)=>{
           users[update]=req.body[update]
       })
       await users.save();
        if(!users)
        {
            res.status(404).send()
        }
        res.send(users)
    }
    catch(error)
    {
        res.status(400).send()
    }
})
router.delete("/users/:id",async(req,res)=>{
     try{
         const users=await User.findByIdAndDelete(req.params.id)
         if(!users)
         {
             res.status(404).send()
         }
         res.send(users)
     }
     catch(error)
     {
         res.status(500).send()
     }
 })


module.exports=router