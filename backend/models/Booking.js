const mongoose=require('mongoose');

const bookingSchema=new mongoose.Schema({
    showId:{type:mongoose.Schema.Types.ObjectId,ref:'Show',required:true},
    userId:{type:String,required:true},
    seats:[String],
    totalAmount:Number,
    bookingDate:{type:Date,default:Date.now}
});

module.exports=mongoose.model('Booking',bookingSchema,'bookings');