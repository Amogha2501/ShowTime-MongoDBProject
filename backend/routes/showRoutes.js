const express=require('express');
const router=express.Router();
const Show=require('../models/Show');

router.get('/',async(req,res)=>{
    try{
        const shows=await Show.find()
        .populate('movieId','title poster')
        .populate('theaterId','name location');
        res.json(shows);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});
router.get('/movie/:movieId',async(req,res)=>{
    try{
        const shows=await Show.find({movieId:req.params.movieId})
        .populate('theaterId','name location');
        res.json(shows);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.post('/add',async(req,res)=>{
const newShow=new Show(req.body);
try{
    const savedShow=await newShow.save();
    res.status(201).json(savedShow);
}catch(err){
    res.status(400).json({error:err.message});
}
});

router.get('/:id',async(req,res)=>{
    try{
        const show=await Show.findById(req.params.id)
        .populate('movieId')
        .populate('theaterId')
        res.json(show);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

module.exports=router;