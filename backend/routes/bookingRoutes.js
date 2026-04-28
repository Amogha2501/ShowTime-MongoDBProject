const express=require('express');
const router=express.Router();
const Booking=require('../models/Booking');
const Show=require('../models/Show');

router.post('/create',async(req,res)=>{
    const {showId,userId,seats,totalAmount}=req.body;
    try{
        console.log("BACKEND: Received booking request for userId:", userId);
        const show = await Show.findById(showId);
        if(!show) return res.status(404).json({error: "Show not found"});

        const alreadyBooked = seats.some(seat => show.bookedSeats.includes(seat));
        if (alreadyBooked) {
            return res.status(400).json({error: "Seats already booked"});
        }
        const newBooking=new Booking({showId,userId,seats,totalAmount});
        await newBooking.save();
        console.log("BACKEND: Booking saved successfully:", newBooking._id);

        await Show.findByIdAndUpdate(showId,{
            $addToSet:{bookedSeats:{$each:seats}}
        });
        res.status(201).json({message:"Booking Successful!",booking:newBooking});
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

// GET /api/bookings/user/:userId
router.get('/user/:userId', async (req, res) => {
    try {
        const searchId = String(req.params.userId).trim();
        console.log("BACKEND: Cleaned search ID:", searchId);
        
        // Find exactly by string ID
        const bookings = await Booking.find({ userId: searchId })
            .populate({
                path: 'showId',
                populate: { path: 'movieId' }
            })
            .sort({ bookingDate: -1 });
        
        console.log(`BACKEND: Found ${bookings.length} bookings for user ${searchId}`);
        res.json(bookings);
    } catch (err) {
        console.error("BACKEND ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports=router;