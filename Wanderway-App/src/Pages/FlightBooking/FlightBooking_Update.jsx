import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CgUser } from "react-icons/cg";
import { MdAirlineSeatReclineExtra } from "react-icons/md";

function FlightBooking_Update() {
    const { flightId, fbookId } = useParams();
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
        <div className='update-page'>
            <div className='update-box'>
                <h1>Update your Booking</h1>
                <h2>Booking ID: {fbookId}</h2>
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
                         <CgUser className="input-icon" />
                    </div>
                        <div className='button-box'>
                            <button type='submit'>Update Booking</button>
                                <Link to={`/list-flight`}>
                            <button>Available Flights</button>
                            </Link>
                        </div>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default FlightBooking_Update