import React, { useEffect, useState } from 'react';
import styles from './FlightPayment.module.css'
import Header from '../../Components/Header';
import { useParams, useNavigate , useLocation} from 'react-router-dom';

function FlightPayment(){
    const location = useLocation();
    const navigate = useNavigate();

    // Get query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const bookingId = queryParams.get('bookingid');
    const destination = queryParams.get('destination');
    const price = queryParams.get('price');
    const departure = queryParams.get('departure');
    const arrival = queryParams.get('arrival');
    
    const serviceFee = price * 0.30;
    const flightFee = price * 0.50;
    const baggageFee = price * 0.10;
    const taxFee = price * 0.05;
    const insuranceFee = price * 0.05;
    
    const [message, setMessage] = useState('');

    const handlePayment = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'Fully Paid' }),
          });
    
          if (response.ok) {
            navigate('/list-flight');
            setMessage("Booking Fully Paid")
          } else {
            setMessage("Booking unsuccessfully Paid")
          }
        } catch (error) {
          console.error('Error updating booking status:', error);
        }
      };
    return(
        <body className={styles.body}>
            <Header/>
            <div className={styles.mainContent}>
                <h1>Flight Payment</h1>
                <p>Booking Id: {bookingId}</p>
                <p>Destination: {destination}</p>
                <p>Departure: {departure}</p>
                <p>Arrival: {arrival}</p>
                <p>Service Fee: ${serviceFee}</p>
                <p>Flight Fee: ${flightFee}</p>
                <p>Baggage Fee: ${baggageFee}</p>
                <p>Tax Fee: ${taxFee}</p>
                <p>Insurance Fee: ${insuranceFee}</p>
                <p> Total Price: ${price}</p>
                <button onClick={handlePayment}>Pay Now</button>
                <p>{message}</p>
                </div>
            
        </body>
    );
}

export default FlightPayment;