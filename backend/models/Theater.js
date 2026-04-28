const mongoose =require('mongoose')

const theaterSchema=new mongoose.Schema({
    theaterId:Number,
    location:{
        address:{
            street1:String,
            city:String,
            state:String,
            zipcode:String
        },
        geo:{
            type:{
                type:String,
                default:"Point"
            },
            coordinates:[Number]
        }
    }
});

module.exports = mongoose.model('Theater', theaterSchema, 'theaters');