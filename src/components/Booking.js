import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Booking() {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/seats')
      .then(response => {
        setSeats(response.data.seats);
      })
      .catch(error => {
        console.error('Error fetching seats:', error);
      });
  }, []);

  const loginUser = () => {
    // You would typically send a request to your server to authenticate the user.
    // For simplicity, let's assume authentication is successful.
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const bookSeat = () => {
    if (selectedSeat !== null) {
      axios.post('http://localhost:4000/book', { seatNumber: selectedSeat + 1 }) // Correcting index
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
      alert(`Seat ${index + 1} is already booked.`); 
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser();
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <h1>Welcome, {username}!</h1>
          <h2>Ticket Booking App</h2>
          <div className="seats">
            {seats.map((isAvailable, index) => (
              <button
                key={index}
                onClick={() => handleSeatClick(index)}
                className={isAvailable ? 'Available' : 'available'}
              >
                Seat {index + 1} {isAvailable ? '(Booked)' : 'available'} 
              </button>
            ))}
          </div>
          <button className="book-seat-btn" onClick={bookSeat}>Book Selected Seat</button>
          <button className="book-seat-btn" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="book-seat-btn" type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default Booking;
