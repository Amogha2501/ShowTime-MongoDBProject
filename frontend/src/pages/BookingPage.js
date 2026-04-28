import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SeatSelector from '../components/SeatSelector';
import { createBooking, getShowById } from '../services/api';
const BookingPage = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  
  if (!token || !storedUser) {
    navigate('/login', { state: { from: `/book/${showId}` } });
  }
}, [showId, navigate]);
  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await getShowById(showId);
        setShow(response.data);
      } catch (err) {
        console.error("Error fetching show:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchShowDetails();
  }, [showId]);

  const seatPrice = show?.price || 150;

  const handleSelectSeats = (seats) => {
    setSelectedSeats(seats);
    setTotalAmount(seats.length * seatPrice);
  };

  const handlePayment = async () => {
    if (selectedSeats.length === 0) return;
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert("Please login again to book tickets.");
      navigate('/login');
      return;
    }
    
    const currentUser = JSON.parse(storedUser);
    setIsBooking(true);
    
    try {
      console.log("Creating booking with user ID:", currentUser.id);
      const bookingData = {
        showId: showId,
        userId: currentUser.id, 
        seats: selectedSeats,
        totalAmount: totalAmount
      };
      
      await createBooking(bookingData);
      setBookingSuccess(true);
    } catch (err) {
      console.error("Booking failed:", err);
      if (err.response && err.response.data && err.response.data.error) {
        alert("Error: " + err.response.data.error);
        if (err.response.data.error === "Seats already booked") {
          window.location.reload();
        }
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setIsBooking(false);
    }
  };

  if (loading) return <div className="loading">Loading seat layout...</div>;

  if (bookingSuccess) {
    return (
      <div className="booking-page-container">
        <div className="booking-success">
          <h3>Booking Successful!</h3>
          <p>Your tickets have been booked. Enjoy the show!</p>
          <button className="home-btn" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page-container">
      <h2 className="booking-title">Select Seats</h2>
      
      <SeatSelector bookedSeats={show?.bookedSeats || []} onSelectSeats={handleSelectSeats} />
      
      <div className="booking-summary">
        <div className="summary-row">
          <span>Selected Seats:</span>
          <span>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
        </div>
        <div className="summary-total">
          <span>Total Amount:</span>
          <span>₹{totalAmount}</span>
        </div>
        
        <button 
          className="pay-btn" 
          disabled={selectedSeats.length === 0 || isBooking}
          onClick={handlePayment}
        >
          {isBooking ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
