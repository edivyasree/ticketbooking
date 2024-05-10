const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

let seats = Array(20).fill(false);

// Route to get available seats
app.get('/seats', (req, res) => {
    res.json({ seats });
});

// Route to book a seat
app.post('/book', (req, res) => {
    const { seatNumber } = req.body;
    if (seatNumber >= 1 && seatNumber < 21 && !seats[seatNumber]) {
        seats[seatNumber] = true;
        res.json({ success: true, message: `Seat ${seatNumber} booked successfully.` });
    } else {
        res.json({ success: false, message: `Seat ${seatNumber} is not available.` });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
