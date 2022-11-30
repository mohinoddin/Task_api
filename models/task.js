const mongoose=require("mongoose");
const Schema=new mongoose.Schema({
    id:{
        type:Number,
        unique:true,
    },
    title:String,
    status:Boolean
});

const model=new mongoose.model("tasks",Schema);

module.exports=model;