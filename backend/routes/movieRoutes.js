const express=require('express')
const router=express.Router();
const Movie=require('../models/Movie')

router.get('/',async(req,res)=>{
    try{
        const movies=await Movie.find().limit(20);
        res.json(movies);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

router.get('/:id',async(req,res)=>{
    try{
        const movie=await Movie.findById(req.params.id);
        if(!movie) return res.status(404).json({message:"Movie not found"});
        res.json(movie);
    }catch{
        res.status(500).json({error:err.message});
    }
});

module.exports=router;