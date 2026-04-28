const express= require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const movieRoutes=require('./routes/movieRoutes');
const theaterRoutes=require('./routes/theaterRoutes');
const showRoutes=require('./routes/showRoutes');
const bookingRoutes=require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express(); 
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(cors());
const uri = process.env.MONGO_URI;

app.use('/api/movies',movieRoutes);
app.use('/api/theaters',theaterRoutes);
app.use('/api/shows',showRoutes);
app.use('/api/bookings',bookingRoutes);
app.use('/api/auth', authRoutes);

if (!uri) {
    console.error("ERROR: MONGO_URI is not defined in your .env file.");
    console.error("Please ensure you have a .env file in the backend directory with MONGO_URI=your_mongodb_connection_string");
    process.exit(1);
}

mongoose.connect(uri)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => {
        console.log("Error connecting to MongoDB:");
        console.error(err.message);
    });

const PORT =process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Server is running");
});