import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CSS/FlightBooking.css';

const FlightBooking = () => {
    const { flightId } = useParams(); 
    const [travellerCtr, setTravellersCtr] = useState(1);
    const [fareclass, setFareclass] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const BookingData = {
            fare_class: fareclass,
            passenger_amount: parseInt(travellerCtr, 10),
            fbook_Id: null,
            flight: { flightId: parseInt(flightId, 10) }
        };
    
        try {
            const response = await axios.post('http://localhost:8080/api/bookings/add', BookingData);
    
            if (response.status === 201) {
                setMessage('Flight booked successfully!');
            } else {
                setMessage("Failed to book Flight");
            }
        } catch (error) {
            console.error('Error booking flight:', error);
            setMessage('Error occurred while booking the flight.');
        }
    };

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
                <button type='submit'>Book Flight</button>
                <Link to={`/list-flight`}>
                <button>Available Flights</button>
                </Link>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FlightBooking;