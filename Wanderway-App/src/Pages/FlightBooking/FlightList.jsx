import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [booked, setBooked] = useState([]);
  const [error, setError] = useState(null); 

  const fetchFlights = () => {
    fetch('http://localhost:8080/api/flights/all')
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setFlights(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        setError("Failed to fetch flights. Please try again later.");
        console.error("Error fetching flights:", error);
      });
  };

  const fetchBookedFlights = () => {
    fetch('http://localhost:8080/api/bookings/all')
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setBooked(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        console.error("Error fetching booked flights:", error);
      });
  };

  const handleDeleteBooking = (fbookId) => {
    fetch(`http://localhost:8080/api/bookings/delete/${fbookId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }
      
      setBooked(prevBooked => prevBooked.filter(booking => booking.fbookId !== fbookId));
    })
    .catch(error => {
      console.error("Error deleting booking:", error);
     
    });
  };

  useEffect(() => {
    fetchFlights();
    fetchBookedFlights();
  }, []);

  return (
    <div className='main-box' style={{ display: 'flex', flexDirection: 'row' }}>d
      <div className='list-box' style={{ display: 'flex', flexDirection: 'column', padding: '50px', width: '500px' }}>
        <h2>Available Flights</h2>
        {flights.length > 0 ? (
          flights.map(flight => (
            <div key={flight.flight_id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
              <h2>Flight ID : {flight.flightId}</h2>
              <h3>Flight from {flight.location_origin} to {flight.location_destination}</h3>
              <p>Departure: {flight.dateDepart}</p>
              <p>Arrival: {flight.dateArrival}</p>
              <p>Class: {flight.flight_class} - Rating: {flight.rating}</p>
              <Link to={`/book/${flight.flightId}`}>
                <button>Book This Flight</button>
              </Link>
            </div>
          ))
        ) : (
          <p>Loading flights...</p>
        )}
      </div>

      <div className='booked-box' style={{ display: 'flex', flexDirection: 'column', padding: '50px', width: '500px' }}>
        <h2>Your Booked Flights</h2>
        {booked.length > 0 ? (
          booked.map(booking => (
            <div key={booking.fbookId} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
              <h2>Flight ID: {booking.flight.flightId}</h2> 
              <h2>Booking ID: {booking.fbookId}</h2>
              <p>Passenger Amount: {booking.passengerAmount}</p>
              <p>Fare Class: {booking.fareClass}</p>
              <Link to={`/bookUpdate/${booking.fbookId}`}>
                <button>Update Details</button>
              </Link>
              <button onClick={() => handleDeleteBooking(booking.fbookId)} style={{ marginTop: '5px', marginLeft: '5px'}}>
                Delete This Flight
              </button>
            </div>
          ))
        ) : (
          <p>Loading booked flights...</p>
        )}
      </div>
    </div>
  );
};

export default FlightList;