import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Components/Logo';
const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [booked, setBooked] = useState([]);
  const [error, setError] = useState(null); 

  const [originSearch, setOriginSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState('');


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
        console.log(booked);
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

  const filteredFlights = flights.filter(flight =>
    flight.location_origin.toLowerCase().includes(originSearch.toLowerCase()) &&
    flight.location_destination.toLowerCase().includes(destinationSearch.toLowerCase())
  );

  return (
    <div className='main-box' style={{ display: 'flex', flexDirection: 'column'}}>
      <div className='sample-header' style={{display: 'flex', justifyContent: 'start', width: '100%', margin: '10px 10px 10px 10px'}}> 
        <Logo/>
      </div>
      <div className='search-box' style={{display: 'flex', flexDirection: 'row', justifyContent: 'center',alignItems: 'center', gap: '25px', marginBottom: '20px'}}>
        
        <div className='search-origin'>
          <input
            type="text" placeholder='Search by origin' value={originSearch}
            onChange={e => setOriginSearch(e.target.value)} 
            style={{ marginRight: '10px', padding: '10px', width: '500px' }}
          />
        </div>
        <div className='search-destination'>
        <input
            type="text" placeholder='Search by destination' value={destinationSearch}
            onChange={e => setDestinationSearch(e.target.value)} 
            style={{ marginRight: '10px', padding: '10px',  width: '500px'}}
          />

        </div>
      </div>
      <div className='list-container' style={{ display: 'flex', flexDirection: 'row', border: "1px solid #ddd"}}>
      <div className='list-box' style={{ display: 'flex', flexDirection: 'column', padding: '50px', width: '500px' }}>
        <h2>Available Flights</h2>
        {flights.length > 0 ? (
          filteredFlights.map(flight => (
            <div key={flight.flight_id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0"}}>
              <h2>Flight ID : {flight.flightId}</h2>
              <h3>Flight from {flight.location_origin} -- to {flight.location_destination}</h3>
              <p>Departure: {flight.dateDepart} --- Arrival: {flight.dateArrival}</p>
              <p>Class: {flight.flight_class} - Rating: {flight.rating}</p>
              <Link to={`/book/${flight.flightId}`}>
                <button style={{backgroundColor: 'aquamarine', width: '90%'}}>BOOK THIS FLIGHT</button>
              </Link>
            </div>
          ))
        ) : (
          <p>Loading flights...</p>
        )}
      </div>
      <div className='booked-box' style={{ display: 'flex', flexDirection: 'column', padding: '50px', width: '500px', border: "1px solid #ddd"}}>
        <h2>Your Booked Flights</h2>
        {booked.length > 0 ? (
          booked.map(booking => (
            <div key={booking.fbookId} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
              <h2>Flight ID: {booking.flight.flightId} -- Booking ID: {booking.fbookId}</h2> 
              <p>Passenger Amount: {booking.passengerAmount}</p>
              <p>Fare Class: {booking.fareClass}</p>
              <Link to={`/bookUpdate/${booking.fbookId}`}>
                <button style={{ backgroundColor: 'aquamarine', width: '40%'}}>UPDATE</button>
              </Link>
              <button onClick={() => handleDeleteBooking(booking.fbookId)} style={{ marginTop: '5px', marginLeft: '5px', backgroundColor: 'aquamarine', width: '40%'}}>
                DELETE
              </button>
            </div>
          ))
        ) : (
          <p>Loading booked flights...</p>
        )}
        </div>
      </div>
    </div>
  );
};

export default FlightList;