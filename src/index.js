const express = require('express')
const app = express()
require('./db/mongoose.js')
const port=process.env.PORT||3000
const userRouter=require("./router/user")
const taskRouter=require("./router/task")
app.use(express.json())
app.use(userRouter);
app.use(taskRouter);

app.listen(port,()=>{
    console.log("Server is up on port"+port);
})