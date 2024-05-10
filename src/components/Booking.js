import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Booking() {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/seats')
      .then(response => {
        setSeats(response.data.seats);
      })
      .catch(error => {
        console.error('Error fetching seats:', error);
      });
  }, []);

  const bookSeat = () => {
    if (selectedSeat !== null) {
      axios.post('http://localhost:4000/book', { seatNumber: selectedSeat })
        .then(response => {
          if (response.data.success) {
            alert(response.data.message);
            setSeats(prevSeats => {
              const newSeats = [...prevSeats];
              newSeats[selectedSeat] = true;
              return newSeats;
            });
            setSelectedSeat(null);
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => {
          console.error('Error booking seat:', error);
        });
    } else {
      alert('Please select a seat to book.');
    }
  };

  const handleSeatClick = (index) => {
    if (!seats[index]) {
      setSelectedSeat(index);
    } else {
      alert(`Seat ${index} is already booked.`);
    }
  };

  return (
    <div className="App">
      <h1>Ticket Booking App</h1>
      <div className="seats">
        {seats.map((isAvailable, index) => (
          <button
            key={index}
            onClick={() => handleSeatClick(index)}
            className={isAvailable ? 'available' : 'booked'}
           
          >
            Seat {index} {isAvailable ? '(Available)' : '(Booked)'}
          </button>
        ))}
      </div>
      <button onClick={bookSeat}>Book Selected Seat</button>
    </div>
  );
}

export default Booking;
