import React, { useState } from 'react';
import axios from 'axios';

const FlightBooking =() => {
    const [from, setFrom] = useState("");
    const [destination, setDestination] = useState("");
    const [travellerCtr, setTravellersCtr] = useState("");
    const [fareclass, setFareclass] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const BookingData ={
            locationOrigin: from,
            locationDestination : destination,
            passengerAmount: travellerCtr,
            fare_class: fareclass
        };
        try{
            const response = await axios.post('http://localhost:8080/api/bookings/add', BookingData);

            if(respone == 201){
                setMessage('Flight booked successfully!');
            }else{
                setMessage("Failed to book Flight");
            }
        }catch(error){
            console.error('Error booking flight:', error);
            setMessage('Error occurred while booking the flight.');
        }

    };
    return(
        <div>
            <h1>Book Your Flights</h1>
            <form onSubmit={handleSubmit}>
                <label>From: </label>
                <input 
                        type="text" 
                        value={from} 
                        onChange={(e) => setFrom(e.target.value)} 
                        required 
                    />
                <br/>
                <label>Destination: </label>
                <input 
                        type="text" 
                        value={destination} 
                        onChange={(e) => setFrom(e.target.value)} 
                        required 
                    />
                <br/>
                <label>Seat Class: </label>
                <input 
                        type="text" 
                        value={fareclass} 
                        onChange={(e) => setFrom(e.target.value)} 
                        required 
                    />
                <br/>
                <label>Number of Travellers: </label>
                <input 
                        type="number" 
                        value={travellerCtr} 
                        onChange={(e) => setFrom(e.target.value)} 
                        required 
                    />
                <br/>
                <button type='submit'>Book Flight</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default FlightBooking