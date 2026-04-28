import React from 'react';
import { useNavigate } from 'react-router-dom';
const ShowCard = ({ show }) => {
  const navigate = useNavigate();

  const handleBook = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { from: `/book/${show._id}` } });
    } else {
      navigate(`/book/${show._id}`);
    }
  };

  return (
    <div className="show-card">
      <div className="theater-info">
        <h4>{show.theaterId?.name || 'Cinema Screen'}</h4>
        <p>{show.theaterId?.location || 'Location Not Specified'}</p>
      </div>
      <div className="show-timing">
        <div className="time">
          {show.time || show.startTime || 'TBA'}
        </div>
        <button className="book-btn" onClick={handleBook}>Book Now</button>
      </div>
    </div>
  );
};

export default ShowCard;