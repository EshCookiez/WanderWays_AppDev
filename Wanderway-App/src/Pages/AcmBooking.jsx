import React, { useState } from 'react';
import axios from 'axios';

const AcmBooking = () => {
    const [acmName, setAcmName] = useState("");
    const [acmType, setAcmType] = useState("");
    const [acmLocation, setAcmLocation] = useState("");
    const [acmPrice, setAcmPrice] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookingData = {
            acm_name: acmName,
            acm_type: acmType,
            acm_location: acmLocation,
            acm_price: parseFloat(acmPrice)
        };

        try {
            const response = await axios.post('http://localhost:8080/api/acc/add', bookingData);

            if (response.status === 200 || response.status === 201) { 
                setMessage('Accommodation booked successfully!');
            } else {
                setMessage("Failed to book accommodation");
                console.error('Error response:', response);
            }
        } catch (error) {
            console.error('Error booking accommodation:', error);
            setMessage('Error occurred while booking the accommodation.');
        }
    };

    return (
        <div>
            <h1>Book Your Accommodation</h1>
            <form onSubmit={handleSubmit}>
                <label>Accommodation Name: </label>
                <input 
                    type="text" 
                    placeholder="Enter Accommodation Name" 
                    value={acmName} 
                    onChange={(e) => setAcmName(e.target.value)}
                    required 
                />
                <br />
                <label>Type: </label>
                <input 
                    type="text" 
                    placeholder="Enter Type (e.g., Hotel, Hostel)" 
                    value={acmType}
                    onChange={(e) => setAcmType(e.target.value)}
                    required 
                />
                <br />
                <label>Location: </label>
                <input 
                    type="text" 
                    placeholder="Enter Location" 
                    value={acmLocation}
                    onChange={(e) => setAcmLocation(e.target.value)}
                    required 
                />
                <br />
                <label>Price: </label>
                <input 
                    type="number" 
                    placeholder="Enter Price" 
                    value={acmPrice}
                    onChange={(e) => setAcmPrice(e.target.value)} 
                    required 
                />
                <br />
                <button type='submit'>Book Accommodation</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AcmBooking;