import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './flightscss.css';
import dayjs from 'dayjs';


const CreateFlight=() => {
    const [message, setMessage] = useState("");
    const [flightData, setFlightData] = useState({
        rating: '',
        dateDepart: '',
        dateArrival:'',
        flight_class: '',
        location_origin:'',
        location_destination:'',
        price:'',
    });

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFlightData({ ...flightData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formattedFlightData = {
            ...flightData,
            dateDepart: dayjs(flightData.dateDepart).format('YYYY-MM-DD HH:mm'),
            dateArrival: dayjs(flightData.dateArrival).format('YYYY-MM-DD HH:mm'),
        };

        try {
            const response = await fetch(`http://localhost:8080/api/flights/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedFlightData),
            });
    
            if (response.ok) {
                setMessage('Flight created successfully!');
            } else {
                setMessage("Failed to create flight");
            }
        } catch (error) {
            setMessage('Error occurred while creating flight.');
        }
    };


    return (
        <div className='flightform-page'>
            <div className='flightform-box'>
                <h1>Create Flight</h1>
                <form onSubmit={handleSubmit} style={{ margin: '20px'}}>
                    <label>Flight Rating</label>
                    <div className='input'>
                        <input
                            type="text" 
                            name="rating" 
                            value={flightData.rating || ''} 
                            onChange={handleInputChange}
                            placeholder="Rating" 
                            required 
                            style={{ padding: '10px', width: '90%'}}/>
                    </div>
                    <label>Departure Time </label> 
                    <div className='input'>
                        <input 
                            type="datetime-local"
                            name="dateDepart" 
                            value={flightData.dateDepart || ''} 
                            onChange={handleInputChange} 
                            placeholder="Departure Date"
                            required 
                            style={{ padding: '10px', width: '90%'}} />
                    </div>
                    <label>Arrival Time</label>
                    <div className='input'>
                        <input 
                            type="datetime-local"
                            name="dateArrival"  
                            value={flightData.dateArrival || ''}
                            onChange={handleInputChange} 
                            placeholder="Arrival Date"
                            required 
                            style={{ padding: '10px', width: '90%'}} />
                    </div>
                    <label>Flight Class</label>
                    <div className='input'>
                        <input 
                            type="text" 
                            name="flight_class" 
                            value={flightData.flight_class || ''}  
                            onChange={handleInputChange} 
                            placeholder="Flight Class"
                            required 
                            style={{ padding: '10px', width: '90%'}} />
                    </div>
                    <label>Flight Origin</label>
                    <div className='input'>
                        <input 
                            type="text" 
                            name="location_origin" 
                            value={flightData.location_origin || ''} 
                            onChange={handleInputChange} 
                            placeholder="Origin"
                            required 
                            style={{ padding: '10px', width: '90%'}} />
                    </div>
                    <label>Flight Destination</label>
                    <div className='input'>
                        <input 
                            type="text" 
                            name="location_destination" 
                            value={flightData.location_destination || ''} 
                            onChange={handleInputChange} 
                            placeholder="Destination"
                            required 
                            style={{ padding: '10px', width: '90%'}} />
                    </div>
                    <label>Price</label>
                    <div className='input'>
                        <input
                            type="number" 
                            name="price" 
                            value={flightData.price || ''}  
                            onChange={handleInputChange} 
                            placeholder="Price"
                            required 
                            style={{ padding: '10px', width: '90%'}} />
                    </div>

                    <div className='button-box'>
                        <button type='submit'>Create Flight</button>
                        <Link to={`/list-flight`}>
                            <button type='button'>Available Flights</button>
                        </Link>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default CreateFlight;