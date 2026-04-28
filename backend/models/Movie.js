const mongoose=require('mongoose');

const movieSchema = new mongoose.Schema({
    title:{type:String,required:true},
    year:Number,
    plot:String,
    poster:String,
    genres:[String],
    runtime:Number,
    cast:[String],
    imdb:{
        rating:Number,
        votes:Number
    }
});

module.exports = mongoose.model('Movie',movieSchema,'movies');
