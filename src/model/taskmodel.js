const mongoose = require("mongoose");

const tsch = mongoose.Schema({
    id:{type:Number,unique:true},
    task:{type:String,required:true},
    is_completed:{type:String,default:false},
})

const Tmodel = mongoose.model("tasks",tsch);

module.exports = Tmodel;