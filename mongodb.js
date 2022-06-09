/* const mongodb = require('mongodb');
const MongoClient=mongodb.MongoClient
const ObjectId = mongodb.ObjectId */
const {MongoClient,ObjectId} = require('mongodb')
const connectionURL='mongodb+srv://Hetvi:H1852etvi@cluster0.glegs.mongodb.net/?retryWrites=true&w=majority'
const databaseName='task-manager'
/* const id = new ObjectId()
console.log(id);
console.log(id.getTimestamp()); */
MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error)
    return console.log("Unable to coonect database");
    const db = client.db(databaseName)
    /* db.collection('users').insertOne({
        _id:id,
        name:"Hetvio",
        age:21
    },(error,result)=>{
        if(error)
        return console.log(error);
        console.log(result.ops);
    }) */
 /*   db.collection('users').findOne({age:1},(error,user)=>{
       if(error)
       return console.log(error)
       console.log(user);
   }) */
   /*  */
})

     /* db.collection('users').insertMany([{
         name:"Tapasya",
         age:2
     },
     {
         name:"Ruchir",
         age:27
     }],(error,result)=>{
        if(error)
        return console.log(error);
        console.log(result.ops);
    }) */
   /*  db.collection('tasks').insertMany([{
        description:"Do Month Shopping",
        completed:"True"
    },
{
    description:"Learning New Skill",
        completed:"True"

},
{
    description:"Bring a Gift",
        completed:"True"
}],(error,result)=>{
    if(error)
    return console.log(error)
    console.log(result.ops);
}) */
//})