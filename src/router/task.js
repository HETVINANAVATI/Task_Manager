const express=require('express')
const router=new express.Router()
const Task=require('../models/task')
 router.delete("/tasks/:id",async(req,res)=>{
    try{
        const tasks=await Task.findByIdAndDelete(req.params.id)
        if(!tasks)
        {
            res.status(404).send()
        }
        res.send(tasks)
    }
    catch(error)
    {
        res.status(500).send()
    }
})
router.patch("/tasks/:id",async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates = ['description','CompletedTask']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation)
    return res.status(400).send("Invalid update");
     try{
         const tasks=await Task.findByIdAndUpdate(req.params.id,req.body,{new:  true,runValidators:true})
         if(!tasks)
         {
             res.status(404).send()
         }
         res.send(tasks)
     }
     catch(error)
     {
         res.status(400).send()
     }
 })
/* app.get("/tasks/:id",(req,res)=>{
    const _id=req.params.id
    Task.findById(_id).then((tasks)=>{
        if(!tasks)
        return res.status(404).send()
        res.send(tasks)
    }).catch((error)=>
    {
        res.status(500).send()
    })
}) */
router.get("/tasks/:id",async(req,res)=>{
    const _id=req.params.id
    try{
        const tasks = await Task.findById(_id)
            if(!tasks)
            return res.status(404).send()
            res.send(tasks)
    }
   catch(error)
    {
        res.status(500).send()
    }
}) 
/* app.get("/tasks",(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((error)=>
    {
        res.send(error)
    })
}) */
router.get("/tasks",async(req,res)=>{
    try{
        const tasks=await Task.find({})
            res.send(tasks)
    }
    catch(error)
    {
        res.send(error)
    }
})
/* app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
}) */
router.post('/tasks', async(req, res) => {
    const task = new Task(req.body)
try{
    await task.save()
        res.status(201).send(task)
}
  catch(e)  {
        res.status(400).send(e)
    }
})
module.exports=router