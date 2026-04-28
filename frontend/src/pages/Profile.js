import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserBookings } from '../services/api';

const Profile = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      navigate('/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    setUser(userData);
    console.log("Fetching bookings for user ID:", userData.id);

    const fetchBookings = async () => {
      try {
        const response = await getUserBookings(userData.id);
        console.log("Bookings received from server:", response.data);
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  if (loading) return <div className="loading">Loading profile...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {user?.username?.charAt(0).toUpperCase()}
        </div>
        <div className="profile-user-info">
          <h2>{user?.username}</h2>
          <p>{user?.email}</p>
          <small style={{ opacity: 0.5 }}>User ID: {user?.id}</small>
        </div>
      </div>

      <div className="bookings-section">
        <h3>My Bookings</h3>
        {bookings.length > 0 ? (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-card-header">
                  <img 
                    src={booking.showId?.movieId?.poster || 'https://via.placeholder.com/100x150'} 
                    alt={booking.showId?.movieId?.title} 
                    className="booking-poster"
                  />
                  <div className="booking-movie-details">
                    <h4>{booking.showId?.movieId?.title || 'Movie Title'}</h4>
                    <p className="booking-time">
                      {booking.showId?.time || booking.showId?.startTime || 'TBA'}
                    </p>
                  </div>
                </div>
                <div className="booking-card-body">
                  <div className="booking-info-item">
                    <span>Seats:</span>
                    <span>{booking.seats.join(', ')}</span>
                  </div>
                  <div className="booking-info-item">
                    <span>Amount Paid:</span>
                    <span>₹{booking.totalAmount}</span>
                  </div>
                  <div className="booking-status">Confirmed</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-bookings">
            <p>You haven't booked any shows yet.</p>
            <button className="book-now-btn" onClick={() => navigate('/')}>Book a Movie</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
