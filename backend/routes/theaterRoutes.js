const express=require('express');
const router=express.Router();
const Theater=require('../models/Theater');

router.get('/',async(req,res)=>{
    try{
        const theaters=await Theater.find().limit(10);
        res.json(theaters);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});
module.exports = router;