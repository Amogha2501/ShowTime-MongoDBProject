import React, { useState } from 'react';
const SeatSelector = ({ bookedSeats = [], onSelectSeats }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return;

    let newSelected;
    if (selectedSeats.includes(seatId)) {
      newSelected = selectedSeats.filter(s => s !== seatId);
    } else {
      newSelected = [...selectedSeats, seatId];
    }
    
    setSelectedSeats(newSelected);
    onSelectSeats(newSelected);
  };

  return (
    <div className="seat-selector">
      <div className="screen-curve">All eyes this way please!</div>
      
      <div className="seats-grid">
        {rows.map(row => (
          <div key={row} className="seat-row">
            <span className="row-label">{row}</span>
            {cols.map(col => {
              const seatId = `${row}${col}`;
              const isOccupied = bookedSeats.includes(seatId);
              const isSelected = selectedSeats.includes(seatId);
              return (
                <div 
                  key={seatId} 
                  className={`seat ${isOccupied ? 'occupied' : isSelected ? 'selected' : 'available'}`}
                  onClick={() => handleSeatClick(seatId)}
                >
                  {col}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatSelector;
