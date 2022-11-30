const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const port=3000 || process.env.PORT;
const taskRouter=require("./Routes/task")

app.use("/",taskRouter);

app.listen(port, ()=>{
    mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true},()=>{
    console.log("connected to database");
})
    console.log(`server is up at ${port}`);
})