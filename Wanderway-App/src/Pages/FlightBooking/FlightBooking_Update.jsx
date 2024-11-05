import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function FlightBooking_Update() {
    const {  flightId, fbookId } = useParams();
    const [travellerCtr, setTravellersCtr] = useState(1);
    const [fareclass, setFareclass] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const BookingData = {
            fare_class: fareclass,
            passenger_amount: parseInt(travellerCtr, 10),
            flight: { flightId: parseInt(flightId, 10) },
            fbook_Id: fbookId
        };
    
        try {
            console.log("Flight ID:", flightId, "Booking ID:", fbookId);
    
            const response = await fetch(`http://localhost:8080/api/bookings/update/${fbookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(BookingData)
            });
    
            if (response.ok) {
                setMessage('Flight booking updated successfully!');
            } else {
                setMessage("Failed to update booking");
            }
        } catch (error) {
            setMessage('Error occurred while updating the booking.');
        }
    };

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/bookings/${fbookId}`);
                const booking = response.data;
                setTravellersCtr(booking.passenger_amount);
                setFareclass(booking.fare_class);
            } catch (error) {
                setMessage('');
            }
        };
    
        fetchBookingData();
    }, [fbookId]);



    return (
        <div>
            <h1>Book Your Flights</h1>
            <h2>Flight ID: {flightId}</h2>
            <form onSubmit={handleSubmit}>
                <label>Seat Class: </label>
                <input 
                    type="text" 
                    placeholder="(Economy, Business, First-Class)" 
                    value={fareclass}
                    onChange={(e) => setFareclass(e.target.value)}
                    required 
                />
                <br />
                <label>Number of Travellers: </label>
                <input 
                    type="number" 
                    placeholder="Enter Number of Travellers" 
                    value={travellerCtr}
                    onChange={(e) => setTravellersCtr(e.target.value)} 
                    required 
                />
                <br />
                <button type='submit'>Update Booking</button>
                <Link to={`/list-flight`}>
                <button>Available Flights</button>
                </Link>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default FlightBooking_Update