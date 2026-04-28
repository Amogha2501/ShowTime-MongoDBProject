const mongoose =require('mongoose');

const showSchema=new mongoose.Schema({
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Movie',
        reuired:true
    },
    theaterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Theater',
        required:true
    },
    startTime:{type:String,required:true},
    screenNumber:Number,
    price:Number,
    totalSeats:{type:Number,default:60},
    bookedSeats:[String]
});

module.exports=mongoose.model('Show',showSchema);