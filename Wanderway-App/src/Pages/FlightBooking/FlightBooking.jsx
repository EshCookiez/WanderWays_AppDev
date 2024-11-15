import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import axios from 'axios';
import './flightscss.css';


const FlightBooking = () => {
    const { flightId, price } = useParams(); 
    const [travellerCtr, setTravellersCtr] = useState(1);
    const [fareclass, setFareclass] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const BookingData = {
            fareClass: fareclass,
            passengerAmount: parseInt(travellerCtr, 10),
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
        <div className='book-page'>
            <div className='book-box'>
                <h1>Book Your Flights</h1>
                <h2>Flight ID: {flightId} -- Price: ${price}</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit} style={{ margin: '20px'}}>
                    <label>Seat Class</label>
                    <div className='input-fareclass'>
                    <input 
                        type="text" 
                        placeholder="(Economy, Business, First-Class)" 
                        value={fareclass}
                        onChange={(e) => setFareclass(e.target.value)}
                        required 
                        style={{ padding: '10px', width: '90%'}}
                    />
                    <MdAirlineSeatReclineExtra className="input-icon"/>
                    </div>
                    <label>Number of Travellers</label>
                    <div className='input-travellers'>
                    <input 
                        type="number" 
                        placeholder="Enter Number of Travellers" 
                        value={travellerCtr}
                        onChange={(e) => setTravellersCtr(e.target.value)} 
                        required 
                        style={{ padding: '10px', width: '90%'}}
                    />
                     <FaUser className="input-icon" />
                    </div>
                    <div className='button-box'>
                        <button type='submit' style={{width: '150px'}}>Book Flight</button>
                        <Link to={`/list-flight`}>
                            <button style={{width: '130px'}}>Available Flights</button>
                        </Link>
                    </div>

                </form>
                
            </div>
        </div>
    );
};

export default FlightBooking;