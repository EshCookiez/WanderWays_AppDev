import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const FlightBooking =() => {
    const [from, setFrom] = useState("");
    const [destination, setDestination] = useState("");
    const [travellerCtr, setTravellersCtr] = useState(1);
    const [fareclass, setFareclass] = useState("");
    const [message, setMessage] = useState("");
    const [flightId, setFlightId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const BookingData = {
            fare_class: fareclass,
            passenger_amount: parseInt(travellerCtr, 10),
            location_origin: from,
            location_destination: destination,
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
            <form onSubmit={handleSubmit}>
                <label>Flight ID: </label>
                <input 
                    type="number" 
                    placeholder="Enter Flight ID" 
                    value={flightId} 
                    onChange={(e) => setFlightId(e.target.value)}
                    required 
                />
            <br/>
                <label>From: </label>
                <input 
                    type="text" 
                    placeholder="Enter Location of Boarding" 
                    value={from} 
                    onChange={(e) => setFrom(e.target.value)} 
                    required 
                />
                <br />
                <label>Destination: </label>
                <input 
                    type="text" 
                    placeholder="Enter Destination" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required 
                />
                <br />
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
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default FlightBooking