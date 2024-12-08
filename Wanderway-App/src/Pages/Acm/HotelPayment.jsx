// HotelPayment.jsx
import React, { useState } from 'react';
import PaymentService from '../../services/PaymentService';

const HotelPayment = ({ selectedRooms, accommodation, totalAmount, onBookingComplete }) => {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');

    const handleBooking = async () => {
        if (!checkInDate || !checkOutDate || !checkInTime || !checkOutTime) {
            alert('Please fill in all details before booking.');
            return;
        }

        const paymentDetails = {
            checkInDate,
            checkOutDate,
            checkInTime,
            checkOutTime,
            roomsSelected: selectedRooms,
            accommodation,
            totalAmount,
        };

        try {
            const response = await PaymentService.createPayment(paymentDetails);
            alert('Payment Successful!');
            onBookingComplete(response.data);
        } catch (error) {
            console.error('Error during payment:', error);
            alert('Payment failed. Please try again.');
        }
    };

    return (
        <div className="hotel-payment">
            <h2>Complete Your Booking</h2>
            <div>
                <label>
                    Check-In Date:
                    <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Check-Out Date:
                    <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Check-In Time:
                    <input type="time" value={checkInTime} onChange={(e) => setCheckInTime(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Check-Out Time:
                    <input type="time" value={checkOutTime} onChange={(e) => setCheckOutTime(e.target.value)} />
                </label>
            </div>
            <button onClick={handleBooking}>Book Now</button>
        </div>
    );
};

export default HotelPayment;